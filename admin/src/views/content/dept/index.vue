<template>
  <div class="app-container">
    <el-row :gutter="10">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-has-permi="['system:dept:add']"
        >新增</el-button>
      </el-col> -->
    </el-row>

    <el-table
      v-loading="$store.state.app.loading"
      :data="deptList"
      row-key="deptId"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="deptName" label="部门名称" width="260" />
      <el-table-column prop="orderNum" label="排序" width="200" />
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="100" />
      <el-table-column label="创建时间" align="center" :formatter="dateFormatter" prop="createdAt" width="200"></el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-has-permi="['system:dept:add']"
            v-if="scope.row.depth!=3"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-has-permi="['system:dept:update']"
          >修改</el-button>
          <el-button
            class="delete"
            v-if="scope.row.parentId != 0"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-has-permi="['system:dept:delete']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col v-if="form.parentId !== 0" :span="24">
            <el-form-item label="上级部门" prop="parentId">
              <treeselect v-model="form.parentId" :options="deptOptions" :normalizer="normalizer" placeholder="选择上级部门" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{ dict.dictLabel }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.depth==3">
            <el-form-item label="内容" prop="content">
              <div style="border: 1px solid #ccc;" v-if="open">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 500px; overflow-y: hidden;"
                    v-model="form.content"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"
                />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allDepartment, getDept, delDept, addDept, updateDept } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getToken } from '@/utils/auth'
import axios from 'axios'

export default {
  name: 'Dept',
  components: {
    Toolbar,
    Editor,
    Treeselect
  },
  data () {
    return {
      editor: null,
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            // 自定义上传图片 方法
            customUpload: this.uploadFile,
            // 上传接口设置文件名
            fieldName: 'file',
            meta: {
              Authorization: 'Bearer ' + getToken()
            }
          },
          uploadVideo: {
            // 自定义上传图片 方法
            customUpload: this.uploadFile,
            // 上传接口设置文件名
            fieldName: 'file',
            meta: {
              Authorization: 'Bearer ' + getToken()
            }
          }
        }
      },
      imgUrl: '',
      uploadFileUrl: process.env.VUE_APP_BASE_API + '/upload', // 上传的图片服务器地址
      mode: 'default', // or 'simple'
      // 表格树数据
      deptList: [],
      // 部门树选项
      deptOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          { required: true, message: '上级部门不能为空', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
    this.getDicts('sys_normal_disable').then(res => {
      this.statusOptions = res.data
    })
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    // 自定义上传图片
    uploadFile (file, insertFn) {
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
    /** 查询部门列表 */
    getList () {
      allDepartment().then(res => {
        const children = this.handleTree(res.data.rows, 'deptId', 'parentId', 'children', this.$store.state.user.userInfo.user.deptId).tree
        const parent = res.data.rows.filter(item => item.deptId === this.$store.state.user.userInfo.user.deptId)
        parent[0].children = children
        this.deptList = parent
        this.deptOptions = parent
      })
    },
    /** 转换部门数据结构 */
    normalizer (node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      }
    },
    // 字典状态字典翻译
    statusFormat (row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        depth: undefined,
        status: '0'
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.getList()
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      if (row !== undefined) {
        this.form.parentId = row.deptId
        this.form.depth = row.depth + 1
      }
      this.open = true
      this.title = '添加部门'
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      getDept(row.deptId).then(res => {
        this.form = res.data
        this.open = true
        this.title = '修改部门'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.deptId !== undefined) {
            updateDept(this.form).then(res => {
              this.$httpResponse(res.msg)
              this.open = false
              this.getList()
            })
          } else {
            addDept(this.form).then(res => {
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
      this.$confirm('是否确认删除名称为"' + row.deptName + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delDept(row.deptId)
      }).then(() => {
        this.getList()
        this.$httpResponse('删除成功')
      }).catch(function () {})
    }
  }
}
</script>
