const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const SongSheetDetail = require('../../../../dao/SongSheetDetail')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/music/songSheetDetail/:songSheetId', async (ctx, next) => {
  let checkLists = ['songSheetId', 'pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let title = ctx.query.title ? ctx.query.title : ''
  let query = {
    pageNum,
    pageSize,
    title
  }
  let songList = await SongSheetDetail.getList(ctx, query, v.get('songSheetId'))
  if (songList) {
    ctx.body = global.success(100010, songList)
  } else {
    ctx.body = global.success(400, songList)
  }
  
})

//  更新
router.put('/music/songSheetDetail/:songSheetId', async (ctx, next) => {
  let checkLists = ['songSheetId', 'songIds'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  
  await SongSheetDetail.bulkCreate(ctx)
})

// 删除
router.delete('/music/songSheetDetail/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  let res = await SongSheetDetail.del(ids)
  if (res) {
    ctx.body = global.success(100040, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100041, null)
  }
})

module.exports = router
