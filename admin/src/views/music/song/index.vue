<template>
  <div class="app-container">
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
      <el-form-item label="歌曲类型" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="歌曲类型"
          @change="handleQuery"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in musicAllTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
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
      <el-table-column label="音频地址" align="center" prop="url">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="封面图" align="center" prop="poster_url">
        <template slot-scope="scope">
          <img :src="baseImgUrl + scope.row.poster_url" alt="">
        </template>
      </el-table-column>
      <el-table-column label="热度" align="center" prop="hot" />
      <el-table-column label="歌曲类型" :formatter="musicTypeFormat" align="center" prop="type" />
      <el-table-column label="创建时间" align="center" prop="createdAt" :formatter="dateFormatter" width="200"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
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
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body @close="onClose">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="歌曲" prop="title">
              <el-input v-model="form.title" placeholder="请输入歌曲" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="歌手" prop="singer">
              <el-input v-model="form.singer" placeholder="请输入歌手" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="音频地址" prop="url">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="audioList"
                :on-change="handleAudioChange"
                :on-remove="handleAudioRemove"
                accept=".mp3"
                :limit="1"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
              <el-input v-model="form.url" style="display: none;" placeholder="请输入音乐链接" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="封面图" prop="poster_url">
              <el-upload
                list-type="picture"
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-change="handlePosterChange"
                accept=".jpg,.jpeg,.png "
                :auto-upload="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-input v-model="form.poster_url" style="display: none;" placeholder="请输入封面图" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="歌曲类型" prop="type">
              <el-select
                v-model="form.type"
                placeholder="歌曲类型"
              >
                <el-option
                  v-for="dict in musicTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="歌词" prop="type">
              <Editor v-model="form.lyric" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top:20px">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSong, getSong, addSong, updateSong, delSong } from '@/api/music/song'
import { uploadAvatar } from '@/api/base'
import Editor from '@/components/Editor'

export default {
  components: {
    Editor
  },
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
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据歌曲
      musicTypeOptions: [],
      // 包含全部的状态
      musicAllTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        type: '',
        status: undefined
      },
      imageUrl: '',
      audioList: [],
      posterfile: null,
      audiofile: null,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: '歌曲名称不能为空', trigger: 'blur' }
        ],
        singer: [
          { required: true, message: '歌手不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '歌曲类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
    this.getDicts('music_song_type').then(res => {
      const all = {
        dictValue: '',
        dictLabel: '全部'
      }
      this.musicTypeOptions = res.data
      this.musicAllTypeOptions = [all, ...res.data]
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
    /** 查询歌曲类型列表 */
    getList () {
      listSong(this.queryParams).then(res => {
        this.typeList = res.data.rows
        this.total = res.data.count
      }
      )
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
    onClose () {
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        title: undefined,
        singer: undefined,
        url: undefined,
        poster_url: undefined,
        type: '',
        lyric: undefined
      }
      this.imageUrl = ''
      this.audioList = []
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
      this.open = true
      this.title = '添加歌曲类型'
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      const id = row.id || this.ids
      getSong(id).then(res => {
        this.form = res.data
        this.imageUrl = res.data.poster_url
        this.audioList.push({
          name: res.data.url,
          url: res.data.url
        })
        this.open = true
        this.title = '修改歌曲类型'
      })
    },
    handleAudioChange (file, fileList) {
      this.audiofile = file.raw
      this.audioList = fileList
    },
    handleAudioRemove (file, fileList) {
      console.log(file, fileList)
      this.audioList = fileList
    },
    handlePosterChange (file, fileList) {
      const isLt2M = file.size / 1024 < 500
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500K!')
        return
      }
      console.log(file.url)
      this.posterfile = file.raw
      this.imageUrl = file.url
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 封面图
          if (this.posterfile) {
            const posterFormData = new FormData()
            posterFormData.append('file', this.posterfile)
            const posterData = await uploadAvatar(posterFormData)
            this.form.poster_url = posterData.data.path
          }

          console.log(this.audioList)
          if (!this.audioList.length) {
            this.$httpResponse('音频不能为空', 'error')
            return
          }
          // 音频地址
          if (this.audiofile) {
            const audioFormData = new FormData()
            audioFormData.append('file', this.audiofile)
            const audioData = await uploadAvatar(audioFormData)
            this.form.url = audioData.data.path
            this.audioList = []
          }

          if (!this.form.url) {
            this.$httpResponse('音频不能为空', 'error')
            return
          }
          if (!this.form.poster_url) {
            this.$httpResponse('封面图不能为空', 'error')
            return
          }

          if (this.form.id !== undefined) {
            updateSong(this.form).then(res => {
              this.$httpResponse(res.msg)
              this.open = false
              this.getList()
            })
          } else {
            addSong(this.form).then(res => {
              this.$httpResponse(res.msg)
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      const dictIds = row.id || this.ids
      this.$confirm('是否确认删除歌曲编号为"' + dictIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delSong(dictIds)
      }).then(() => {
        this.getList()
        this.$httpResponse('删除成功')
      }).catch(function () {})
    }
  }
}
</script>

<style scoped lang="scss">
  .avatar-uploader {
    color: #333;
    &/deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    &/deep/ .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      object-fit: cover;
      display: block;
    }
  }
</style>
