const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/system/banner', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let title = ctx.query.title ? ctx.query.title : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    title,
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('Banner', query, [['orderNum', 'DESC']])
  ctx.body = global.success(100010, roleList)
})

// 获取某个字典
router.get('/system/banner/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('Banner', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/banner', async (ctx, next) => {
  let checkLists = ['title', 'imgUrl','orderNum','visible'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    title: v.get('title'),
    imgUrl: v.get('imgUrl'),
    orderNum: v.get('orderNum'),
    visible: v.get('visible'),
    remark: "",
    jumpUrl: "",
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('Banner', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/banner', async (ctx, next) => {
  let checkLists = ['id', 'title', 'imgUrl','orderNum','visible'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    title: v.get('title'),
    imgUrl: v.get('imgUrl'),
    orderNum: v.get('orderNum'),
    visible: v.get('visible'),
    remark: v.get('remark'),
    updatedBy: ctx.state.user.userName
  }

  let res = await Generic.update('Banner', query, {
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
router.delete('/system/banner/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('Banner', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
