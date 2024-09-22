const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 无token获取列表
router.get('/system/common/culture', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    type:"2",
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('Content', query)
  ctx.body = global.success(100010, roleList)
})
// 获取党建列表
router.get('/system/culture', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let title = ctx.query.title ? ctx.query.title : ''
  let type = ctx.query.type ? ctx.query.type : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    title,
    type,
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('Content', query)
  ctx.body = global.success(100010, roleList)
})
// 获取党建列表
router.get('/system/service', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let title = ctx.query.title ? ctx.query.title : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    title,
    type:'3',
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('Content', query,[['orderNum', 'ASC']])
  ctx.body = global.success(100010, roleList)
})
// 获取专家列表
router.get('/system/content', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let title = ctx.query.title ? ctx.query.title : ''
  let type = ctx.query.type ? ctx.query.type : ''
  let deptId = ctx.query.deptId ? ctx.query.deptId : ''  
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let orderNum = ctx.query.orderNum ? ctx.query.orderNum : ''
  let query = {
    title,
    type,
    deptId,
    pageNum,
    pageSize,
    orderNum
  }
  let roleList = await Generic.getList('Content', query)
  ctx.body = global.success(100010, roleList)
})

// 获取某个字典
router.get('/system/content/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('Content', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/content', async (ctx, next) => {
  let checkLists = ['title', 'content'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    title: v.get('title'),
    type: v.get('type'),
    content: v.get('content'),
    imgUrl: v.get('imgUrl'),
    role: v.get('role'),
    desc: v.get('desc'),
    status: v.get('status'),
    remark: v.get('remark'),
    deptId: v.get('deptId'),
    orderNum: v.get('orderNum'),
    deptName: v.get('deptName'),
    job: v.get('job'),
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('Content', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/content', async (ctx, next) => {
  console.log(2333,ctx.state)
  let checkLists = ['id', 'title', 'content'] // 要校验的字段
  let v = new Validator(ctx) 
  v.check(checkLists)
  let query = {
    title: v.get('title'),
    type: v.get('type'),
    content: v.get('content'),
    imgUrl: v.get('imgUrl'),
    role: v.get('role'),
    desc: v.get('desc'),
    status: v.get('status'),
    remark: v.get('remark'),
    deptId: v.get('deptId'),
    deptName: v.get('deptName'),
    orderNum: v.get('orderNum'),
    job: v.get('job'),
    updatedBy: ctx.state.user.userName
  }

  let res = await Generic.update('Content', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 删除
router.delete('/system/content/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('Content', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
