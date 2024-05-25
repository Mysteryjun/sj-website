const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取所有列表
router.get('/music/allSong', async (ctx, next) => {
  let songList = await Generic.getAll('Song')
  ctx.body = global.success(100010, songList)
})

// 获取列表
router.get('/music/song', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let title = ctx.query.title ? ctx.query.title : ''
  let type = ctx.query.type ? ctx.query.type : ''
  let query = {
    pageNum,
    pageSize,
    title,
    type
  }
  let songList = await Generic.getList('Song', query)
  ctx.body = global.success(100010, songList)
})

// 获取某个歌曲
router.get('/music/song/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('Song', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/music/song', async (ctx, next) => {
  let checkLists = ['title', 'singer', 'url', 'poster_url', 'type', 'lyric'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    userId: ctx.state.user.id,
    title: v.get('title'),
    singer: v.get('singer'),
    url: v.get('url'),
    poster_url: v.get('poster_url'),
    hot: v.get('hot'),
    type: v.get('type'),
    lyric: v.get('lyric'),
    createdBy: ctx.state.user.userName
  }

  let res = await Generic.create('Song', query)
  if (res) {
    ctx.body = global.success(100020, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100021, null)
  }
})

// 修改
router.put('/music/song', async (ctx, next) => {
  let checkLists = ['id', 'title', 'singer', 'url', 'poster_url', 'type', 'lyric'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    userId: ctx.state.user.id,
    title: v.get('title'),
    singer: v.get('singer'),
    url: v.get('url'),
    poster_url: v.get('poster_url'),
    hot: v.get('hot'),
    type: v.get('type'),
    lyric: v.get('lyric'),
    updatedBy: ctx.state.user.userName
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

// 删除
router.delete('/music/song/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await Generic.del('Song', ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
