const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/wx/music/songSheet', async (ctx, next) => {
  let title = ctx.query.title ? ctx.query.title : ''
  let query = {
    pageNum: 1,
    pageSize: 10,
    title
  }
  let songList = await Generic.getList('SongSheet', query, [['hot', 'DESC']])
  ctx.body = global.success(100010, songList)
})

// 获取某个歌曲
router.get('/wx/music/songSheet/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('SongSheet', v.get('id'))
  ctx.body = global.success(100010, res)
})

// 修改
router.put('/wx/music/songSheet', async (ctx, next) => {
  let checkLists = ['id'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let data = await Generic.getById('SongSheet', v.get('id'))
  let hot = data.hot + 1
  let query = {
    hot
  }

  let res = await Generic.update('SongSheet', query, {
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
