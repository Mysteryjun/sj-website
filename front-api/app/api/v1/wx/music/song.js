const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const DictData = require('../../../../dao/DictData')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

router.get('/wx/music/list', async (ctx, next) => {
  let query = {
    pageNum: 1,
    pageSize: 10
  }
  query.title = ctx.query.title ? ctx.query.title : ''
  let songList = await Generic.getList('Song', query, [['hot', 'DESC']])
  ctx.body = global.success(100010, songList)
})

// 获取某个字典
router.get('/wx/dict_data/:params', async (ctx, next) => {
  let checkLists = ['params']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await DictData.getByDictType(v.get('params'))
  ctx.body = global.success(100010, res)
})

// 修改
router.put('/wx/music/song', async (ctx, next) => {
  let checkLists = ['id'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let data = await Generic.getById('Song', v.get('id'))
  let hot = data.hot + 1
  let query = {
    hot
  }

  let res = await Generic.update('Song', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})


module.exports = router
