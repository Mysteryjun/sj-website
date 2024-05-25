// H5页面
const Router = require('koa-router')
const Generic = require('../../dao/Generic')

const router = new Router({
    prefix: '/m' // 路由统一前缀
})
// 首页
router.get('/home', async (ctx, next) => {  
  let query = {
    pageNum:1,
    pageSize:10
  }
  let roleList = await Generic.getList('Notice',query) 
  console.log('Notice',roleList)
  await ctx.render('m/home',  //渲染用ctx.render,index是页面
      {title:"首页",roleList:roleList.rows}	 //将定义的数据title传给dataTitle
  )
})
// 医院概况
router.get('/intro', async (ctx, next) => {   
  await ctx.render('m/intro',  //渲染用ctx.render,index是页面
      {title:"医院概况"}	 //将定义的数据title传给dataTitle
  )
})
  
module.exports = router
  