<template>
    <div class="app-container">
      <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入标题"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-row :gutter="10" >
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
  
      <el-table v-loading="$store.state.app.loading" :data="bannerList" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55"  /> -->
        <el-table-column
          label="标题"          
          prop="title"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="图片"  prop="createdBy" width="350" >
            <template slot-scope="scope">
                <div class="banner-img" style="width:300px;height: 130px;">
                    <img  :src="scope.row.imgUrl"  width="100%">
                </div>
            </template>
        </el-table-column>
        <el-table-column label="显示排序"  prop="orderNum" width="100" />
        <el-table-column label="显示状态"  prop="visible" :formatter="statusFormat" width="80" />
        <el-table-column label="创建者"  prop="createdBy" width="100" />
        <el-table-column label="创建时间"  prop="createdAt" :formatter="dateFormatter" width="200"> </el-table-column>
        <el-table-column label="操作"  class-name="small-padding fixed-width">
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
  
      <!-- 添加或修改对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入标题" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="图片" prop="imgUrl">
                <el-upload
                    action=""
                    class="banner-uploader"
                    :http-request="uploadImg"
                    :show-file-list="false">
                    <img v-if="imgUrl" :src="imgUrl" class="banner">
                    <i v-else class="el-icon-plus banner-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="显示排序" prop="orderNum">
                <el-input v-model="form.orderNum" placeholder="请输入显示排序(数字越大越靠前)" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="显示状态">
                <el-radio-group v-model="form.visible">
                    <el-radio
                    v-for="dict in visibleOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                    >{{ dict.dictLabel }}</el-radio>
                </el-radio-group>
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
  import { listBanner, getBanner, delBanner, addBanner, updateBanner } from '@/api/banner'
  import { getToken } from '@/utils/auth'
  
  export default {
    name: 'Banner',
    data () {
      return {
        // 显示状态数据字典
        visibleOptions: [],
        imgUrl:'',
        uploadImgUrl: process.env.VUE_APP_BASE_API + '/upload', // 上传的图片服务器地址      
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 表格数据
        bannerList: [],
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          title: undefined,
        },
        // 表单参数
        form: {
            title: '',
            imgUrl: '',
            orderNum: '',
            visible: "0"
        },
        // 表单校验
        rules: {
          title: [
            { required: true, message: '标题不能为空', trigger: 'blur' }
          ],
          imgUrl: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
          orderNum: [
            { required: true, message: '序号不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getList()
      this.getDicts('sys_show_hide').then(res => {
        this.visibleOptions = res.data
      })
    },
    methods: {
        // 菜单状态字典翻译
      statusFormat (row, column) {
        return this.selectDictLabel(this.visibleOptions, row.visible)
      },
      uploadImg (option) {
        console.log(option)
        const imgData = new FormData()
        imgData.append('file', option.file)
        axios({
            url: this.uploadImgUrl,
            data: imgData,
            method: 'post',
            headers: {
            Authorization: 'Bearer ' + getToken()
            }
        }).then((res) => {
            console.log(res)
            this.imgUrl = process.env.VUE_APP_BASE_IMG + res.data.path
            this.form.imgUrl = this.imgUrl
        })
      },
      /** 查询列表 */
      getList () {
        listBanner(this.queryParams).then(res => {
          this.bannerList = res.data.rows
          this.total = res.data.count
        })
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
          title: undefined,
          imgUrl: undefined,
          orderNum: undefined,
          visible:1
        }
        this.imgUrl = ""
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
        this.title = '添加'
      },
      /** 修改按钮操作 */
      handleUpdate (row) {
        this.reset()
        const id = row.id || this.ids
        getBanner(id).then(res => {
          this.form = res.data
          this.imgUrl = this.form.imgUrl
          this.open = true
          this.title = '修改'
        })
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id !== undefined) {
              updateBanner({ ...this.form }).then(res => {
                this.$httpResponse(res.msg)
                this.open = false
                this.getList()
              })
            } else {
              addBanner(this.form).then(res => {
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
        this.$confirm('是否确认删除编号为"' + noticeIds + '"的数据项?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return delBanner(noticeIds)
        }).then(() => {
          this.getList()
          this.$httpResponse('删除成功')
        }).catch(function () {})
      }
    }
  }
  </script>
