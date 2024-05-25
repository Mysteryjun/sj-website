const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/system/notice', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let noticeTitle = ctx.query.noticeTitle ? ctx.query.noticeTitle : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    noticeTitle,
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('Notice', query)
  ctx.body = global.success(100010, roleList)
})

// 获取某个字典
router.get('/system/notice/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('Notice', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/notice', async (ctx, next) => {
  let checkLists = ['noticeTitle', 'noticeContent'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    noticeTitle: v.get('noticeTitle'),
    noticeType: v.get('noticeType'),
    noticeContent: v.get('noticeContent'),
    status: v.get('status'),
    remark: v.get('remark'),
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('Notice', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/notice', async (ctx, next) => {
  let checkLists = ['id', 'noticeTitle', 'noticeContent'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    noticeTitle: v.get('noticeTitle'),
    noticeType: v.get('noticeType'),
    noticeContent: v.get('noticeContent'),
    status: v.get('status'),
    remark: v.get('remark'),
    updatedBy: ctx.state.user.userName
  }

  let res = await Generic.update('Notice', query, {
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
router.delete('/system/notice/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('Notice', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
