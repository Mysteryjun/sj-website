const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const DictData = require('../../../../dao/DictData')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取所有
router.get('/system/dict_data_all', async (ctx, next) => {
  let roleList = await Generic.getAll('DictData')
  ctx.body = global.success(100010, roleList)
})

// 获取列表
router.get('/system/dict_data', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let dictType = ctx.query.dictType ? ctx.query.dictType : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    dictType,
    pageNum,
    pageSize
  }
  let roleList = await Generic.getList('DictData', query)
  ctx.body = global.success(100010, roleList)
})

// 获取某个字典
router.get('/system/dict_data/:params', async (ctx, next) => {
  let checkLists = ['params']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await DictData.getByDictType(v.get('params'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/dict_data', async (ctx, next) => {
  let checkLists = ['dictSort', 'dictLabel', 'dictValue', 'dictType'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    dictSort: v.get('dictSort'),
    dictLabel: v.get('dictLabel'),
    dictValue: v.get('dictValue'),
    dictType: v.get('dictType'),
    cssClass: v.get('cssClass'),
    listClass: v.get('listClass'),
    isDefault: v.get('isDefault'),
    status: v.get('status'),
    remark: v.get('remark'),
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('DictData', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/system/dict_data', async (ctx, next) => {
  let checkLists = ['id', 'dictSort', 'dictLabel', 'dictValue', 'dictType'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    dictSort: v.get('dictSort'),
    dictLabel: v.get('dictLabel'),
    dictValue: v.get('dictValue'),
    dictType: v.get('dictType'),
    cssClass: v.get('cssClass'),
    listClass: v.get('listClass'),
    isDefault: v.get('isDefault'),
    status: v.get('status'),
    remark: v.get('remark'),
    updatedBy: ctx.state.user.userName
  }

  let res = await Generic.update('DictData', query, {
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
router.delete('/system/dict_data/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('DictData', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
