<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入公告标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="noticeType">
        <el-select v-model="queryParams.noticeType" placeholder="公告类型" clearable size="small">
          <el-option
            v-for="dict in typeOptions"
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
          v-has-permi="['system:notice:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-has-permi="['system:notice:update']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-has-permi="['system:notice:delete']"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="$store.state.app.loading" :data="noticeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        label="公告标题"
        align="center"
        prop="noticeTitle"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="公告类型"
        align="center"
        prop="noticeType"
        :formatter="typeFormat"
        width="100"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
        width="100"
      />
      <el-table-column label="创建者" align="center" prop="createdBy" width="100" />
      <el-table-column label="创建时间" align="center" prop="createdAt" :formatter="dateFormatter" width="200"> </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-has-permi="['system:notice:update']"
          >修改</el-button>
          <el-button
            class="delete"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-has-permi="['system:notice:delete']"
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

    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告标题" prop="noticeTitle">
              <el-input v-model="form.noticeTitle" placeholder="请输入公告标题" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="公告副标题" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入公告副标题(首页显示用)" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select v-model="form.noticeType" placeholder="请选择">
                <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <div style="border: 1px solid #ccc;" v-if="open">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="form.noticeContent"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"
                />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件名称" prop="fileName">
              <el-input v-model="form.fileName" placeholder="请输入附件名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件">
              <el-upload
                class="upload-demo"
                action=""
                :http-request="uploadFile"
                :show-file-list="false"
                >
                <el-button size="small" type="primary">上传</el-button>
                <el-button size="small"  @click="previewFile" :disabled="!form.fileUrl">预览</el-button>
              </el-upload>
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
import axios from 'axios'
import { listNotice, getNotice, delNotice, addNotice, updateNotice } from '@/api/content/notice'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getToken } from '@/utils/auth'

export default {
  name: 'Notice',
  components: {
    Toolbar,
    Editor
  },
  data () {
    return {
      fileList: [],
      editor: null,
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            // 自定义上传图片 方法
            customUpload: this.uploadImg,
            // 上传接口设置文件名
            fieldName: 'file',
            meta: {
              Authorization: 'Bearer ' + getToken()
            }
          },
          uploadVideo: {
            // 自定义上传图片 方法
            customUpload: this.uploadImg,
            // 上传接口设置文件名
            fieldName: 'file',
            meta: {
              Authorization: 'Bearer ' + getToken()
            }
          }
        }
      },
      uploadFileUrl: process.env.VUE_APP_BASE_API + '/upload', // 上传的图片服务器地址
      mode: 'default', // or 'simple'
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        noticeTitle: undefined,
        status: undefined
      },
      // 表单参数
      form: {
        fileName: '',
        fileUrl: '',
        noticeContent: ''
      },
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: '公告标题不能为空', trigger: 'blur' }
        ],
        noticeType: [
          { required: true, message: '公告类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
    this.getDicts('sys_notice_status').then(res => {
      this.statusOptions = res.data
    })
    this.getDicts('sys_notice_type').then(res => {
      this.typeOptions = res.data
    })
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    previewFile () {
      window.open(this.form.fileUrl)
    },
    uploadFile (option) {
      console.log(option)
      const imgData = new FormData()
      imgData.append('file', option.file)
      axios({
        url: this.uploadFileUrl,
        data: imgData,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      }).then((res) => {
        console.log(res)
        this.form.fileUrl = process.env.VUE_APP_BASE_IMG + res.data.path
      })
    },
    // 自定义上传图片
    uploadImg (file, insertFn) {
      const imgData = new FormData()
      imgData.append('file', file)
      axios({
        url: this.uploadFileUrl,
        data: imgData,
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      }).then((res) => {
        console.log(res)
        insertFn(process.env.VUE_APP_BASE_IMG + res.data.path)
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      })
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    /** 查询公告列表 */
    getList () {
      listNotice(this.queryParams).then(res => {
        this.noticeList = res.data.rows
        this.total = res.data.count
      })
    },
    // 公告状态字典翻译
    statusFormat (row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 公告状态字典翻译
    typeFormat (row, column) {
      return this.selectDictLabel(this.typeOptions, row.noticeType)
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: '',
        fileUrl: '',
        status: '0'
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
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset()
      this.open = true
      this.title = '添加公告'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      const id = row.id || this.ids
      getNotice(id).then(res => {
        this.form = res.data
        this.open = true
        this.title = '修改公告'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateNotice(this.form).then(res => {
              this.$httpResponse(res.msg)
              this.open = false
              this.getList()
            })
          } else {
            addNotice(this.form).then(res => {
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
      const noticeIds = row.id || this.ids
      this.$confirm('是否确认删除标题为"' + row.title + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delNotice(noticeIds)
      }).then(() => {
        this.getList()
        this.$httpResponse('删除成功')
      }).catch(function () {})
    }
  }
}
</script>
