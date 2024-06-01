// PC页面
const router = require('koa-router')();
const Generic = require('../../dao/Generic');
const moment = require('moment');
// 首页
router.get('/', async (ctx, next) => {
    let noticeQuery = {
        pageNum: 1,
        pageSize: 4,
        noticeType:'2'
    };
    let noticeList = await Generic.getList('Notice', noticeQuery);
    let publicityQuery = {
        pageNum: 1,
        pageSize: 4,
        noticeType:'1'
    };
    let publicityList = await Generic.getList('Notice', publicityQuery);
    await ctx.render(
        'index', //渲染用ctx.render,index是页面
        {
            title: '首页',
            noticeList: noticeList.rows,
            publicityList: publicityList.rows,
            moment:moment
        }
    );
});
// 医院概况
router.get('/home/intro', async (ctx, next) => {
    await ctx.render(
        'home/intro', //渲染用ctx.render,index是页面
        {
            title: '医院概况',
        } //将定义的数据title传给dataTitle
    );
});
// 通知公告
router.get('/home/notice', async (ctx, next) => {
    await ctx.render(
        'home/notice', //渲染用ctx.render,index是页面
        {
            title: '通知公告',
        } //将定义的数据title传给dataTitle
    );
});
// 院务公开
router.get('/home/publicity', async (ctx, next) => {
    await ctx.render(
        'home/publicity', //渲染用ctx.render,index是页面
        {
            title: '院务公开',
        } //将定义的数据title传给dataTitle
    );
});
// 联系我们
router.get('/home/about', async (ctx, next) => {
    await ctx.render(
        'home/about', //渲染用ctx.render,index是页面
        {
            title: '联系我们',
        } //将定义的数据title传给dataTitle
    );
});

module.exports = router;
