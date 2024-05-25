const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/system/dict_type', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let dictType = ctx.query.dictType ? ctx.query.dictType : ''
  let dictName = ctx.query.dictName ? ctx.query.dictName : ''
  let status = ctx.query.status ? ctx.query.status : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    dictType,
    dictName,
    status,
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('DictType', query)
  ctx.body = global.success(100010, roleList)
})

// 获取某个字典
router.get('/system/dict_type/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('DictType', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/dict_type', async (ctx, next) => {
  let checkLists = ['dictName', 'dictType'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    dictName: v.get('dictName'),
    dictType: v.get('dictType'),
    status: v.get('status'),
    remark: v.get('remark'),
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('DictType', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/dict_type', async (ctx, next) => {
  let checkLists = ['id', 'dictName', 'dictType'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    dictName: v.get('dictName'),
    dictType: v.get('dictType'),
    status: v.get('status'),
    remark: v.get('remark'),
    updatedBy: ctx.state.user.userName
  }

  let res = await Generic.update('DictType', query, {
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
router.delete('/system/dict_type/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('DictType', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
