const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const SongSheetDetail = require('../../../../dao/SongSheetDetail')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 获取列表
router.get('/wx/music/songSheetDetail/:songSheetId', async (ctx, next) => {
  let checkLists = ['songSheetId'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let songList = await SongSheetDetail.getAll(ctx, v.get('songSheetId'))
  if (songList) {
    ctx.body = global.success(100010, songList)
  } else {
    ctx.body = global.success(400, songList)
  }
  
})

module.exports = router
