const Router = require('koa-router');
const router = new Router()
// 配置中间件
router.get('/home', async (ctx, next) => {
    let title ='你好ejs'  //这是js里面的数据
    await ctx.render('index',  //渲染用ctx.render,index是页面
    {dataTitle:title}	 //将定义的数据title传给dataTitle
    )
  })
  
  module.exports = router
  