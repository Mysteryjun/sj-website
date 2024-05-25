const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const Role = require('../../../../dao/Role')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})


// 分页查询角色
router.get('/system/role', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let roleName = ctx.query.roleName ? ctx.query.roleName : ''
  let status = ctx.query.status ? ctx.query.status : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    roleName,
    status,
    pageNum,
    pageSize
  }
  let roleList = await Role.getList(query)
  ctx.body = global.success(100010, roleList)
})

// 查询所有角色
router.get('/system/allRole', async (ctx, next) => {
  let roleList = await Generic.getAll('Role')
  ctx.body = global.success(100010, roleList)
})

// 获取某个角色
router.get('/system/role/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Role.getById(v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/role', async (ctx, next) => {
  let checkLists = ['roleName', 'menuIds', 'roleKey', 'roleSort'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    roleName: v.get('roleName'),
    roleKey: v.get('roleKey'),
    status: v.get('status'),
    roleSort: v.get('roleSort')
  }
  await Role.addTransaction(ctx, query, v.get('menuIds'))
})

// 修改状态
router.put('/system/role/:id/updateStatus', async (ctx, next) => {
  let checkLists = ['id', 'status'] // 要校验的字段
  let v = new Validator(ctx);
  v.check(checkLists)
  let query = {
    status: v.get('status')
  }
  let res = await Generic.update('Role', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 修改
router.put('/system/role', async (ctx, next) => {
  let checkLists = ['id', 'roleName', 'menuIds', 'roleKey', 'roleSort'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    roleName: v.get('roleName'),
    roleKey: v.get('roleKey'),
    roleSort: v.get('roleSort'),
    dataScope: v.get('dataScope'),
    status: v.get('status'),
    isDelete: v.get('isDelete'),
    remark: v.get('remark'),
    createdBy:ctx.state.user.userName,
    updatedBy: ctx.state.user.userName
  }
  await Role.updateTransaction(ctx, query, v.get('menuIds'), v.get('id'))
})

// 删除
router.delete('/system/role/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  await Role.delTransaction(ctx, ids)
})

module.exports = router
