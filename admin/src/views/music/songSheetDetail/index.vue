<template>
  <div class="app-container songSheetDetail">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="歌曲" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入歌曲"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >编辑歌单</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="$store.state.app.loading" :data="typeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="歌曲" align="center" prop="title"></el-table-column>
      <el-table-column label="歌手" align="center" prop="singer" />
      <el-table-column label="url" align="center" prop="url" />
      <el-table-column label="封面图" align="center" prop="poster_url">
        <template slot-scope="scope">
          <img :src="baseImgUrl + scope.row.poster_url" alt="">
        </template>
      </el-table-column>
      <el-table-column label="热度" align="center" prop="hot" />
      <el-table-column label="歌曲类型" :formatter="musicTypeFormat" align="center" prop="type" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            class="delete"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body class="dialog" width="780px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="选择歌曲" prop="title">
          <el-transfer
            filterable
            v-model="form.songIds"
            :titles="['未选歌曲', '已选歌曲']"
            :data="allSong"
            :props="{
              key: 'id',
              value: 'id',
              label: 'title'
            }"
          ></el-transfer>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSongSheetDetail, addSongSheetDetail, delSongSheetDetail } from '@/api/music/songSheetDetail'
import { AllSong } from '@/api/music/song'

export default {
  data () {
    return {
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 歌曲表格数据
      typeList: [],
      // 所有歌曲
      allSong: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据歌曲
      musicTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined
      },
      // 表单参数
      form: {
        songIds: []
      },
      // 表单校验
      rules: {
        // songIds: [
        //   { required: true, message: '歌曲不能为空', trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    this.getList()
    this.getAllSong()
    this.getDicts('music_song_type').then(res => {
      const all = {
        dictValue: '',
        dictLabel: '全部'
      }
      this.musicTypeOptions = [all, ...res.data]
    })
  },
  methods: {
    musicTypeFormat (row, column) {
      let str = ''
      this.musicTypeOptions.forEach(item => {
        if (item.dictValue === row.type) {
          str = item.dictLabel
        }
      })
      return str
    },
    getAllSong () {
      AllSong().then(res => {
        this.allSong = res.data.rows
        console.log(this.allSong)
      })
    },
    /** 查询歌曲类型列表 */
    getList () {
      listSongSheetDetail(this.$route.params.id, this.queryParams).then(res => {
        this.typeList = res.data.rows
        this.total = res.data.count
      })
    },
    // 歌曲状态歌曲翻译
    statusFormat (row, column) {
      return this.selectDictLabel(this.musicTypeOptions, row.status)
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        songIds: []
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset()
      this.form.songIds = this.typeList.map(item => item.id)
      this.open = true
      this.title = '添加歌曲类型'
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          addSongSheetDetail(this.$route.params.id, this.form).then(res => {
            this.$httpResponse(res.msg)
            this.open = false
            this.getList()
          })
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delSongSheetDetail(ids)
      }).then(() => {
        this.getList()
        this.$httpResponse('删除成功')
      }).catch(function () {})
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog{
    &/deep/ .el-checkbox{
      display: block;
    }
  }
</style>
