const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const Department = require('../../../../dao/Department')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 分页查询部门信息
router.get('/system/department', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let deptName = ctx.query.deptName ? ctx.query.deptName : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    deptName,
    pageNum,
    pageSize
  }
  let menuList = await Generic.getList('Department', query)
  ctx.body = global.success(100010, menuList)
})

// 查询所有部门
router.get('/system/allDepartment', async (ctx, next) => {
  let menuList = await Department.getAll(ctx)
  ctx.body = global.success(100010, menuList)
})

// 获取某个部门
router.get('/system/department/:deptId', async (ctx, next) => {
  let checkLists = ['deptId']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Department.getById(v.get('deptId'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/department', async (ctx, next) => {
  let checkLists = ['parentId', 'deptName', 'orderNum'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    parentId: v.get('parentId'),
    deptName: v.get('deptName'),
    orderNum: v.get('orderNum')
  }

  let res = await Generic.create('Department', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/department', async (ctx, next) => {
  let checkLists = ['deptId', 'parentId', 'deptName', 'orderNum'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)

  let query = {
    parentId: v.get('parentId'),
    deptName: v.get('deptName'),
    orderNum: v.get('orderNum'),
    status: v.get('status'),
    isDelete: v.get('isDelete'),
    createdBy: ctx.state.user.userName,
    updatedBy: ctx.state.user.userName
  }
  let res = await Generic.update('Department', query, {
    deptId: v.get('deptId')
  })
  console.log(res)
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 删除
router.delete('/system/department/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Department.del(ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
