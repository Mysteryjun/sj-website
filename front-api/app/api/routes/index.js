const router = require('koa-router')()
const Generic = require('../../dao/Generic')
// 首页
router.get('/', async (ctx, next) => {  
  let query = {
    pageNum:1,
    pageSize:10
  }
  let roleList = await Generic.getList('Notice',query) 
  console.log('Notice',roleList)
  await ctx.render('index',  //渲染用ctx.render,index是页面
      {title:"首页",roleList:roleList.rows}	 //将定义的数据title传给dataTitle
  )
})
// 医院概况
router.get('/intro', async (ctx, next) => {   
  await ctx.render('intro',  //渲染用ctx.render,index是页面
      {title:"医院概况"}	 //将定义的数据title传给dataTitle
  )
})
  
module.exports = router
  