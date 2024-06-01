// PC页面
const router = require('koa-router')();
const Generic = require('../../dao/Generic');
const Validator = require('../../utils/validator');
const moment = require('moment');
// 首页
router.get('/', async (ctx, next) => {
    let noticeQuery = {
        pageNum: 1,
        pageSize: 6,
        noticeType:'2'
    };
    let noticeList = await Generic.getList('Notice', noticeQuery);
    let publicityQuery = {
        pageNum: 1,
        pageSize: 6,
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
    res = await Generic.getById('Info', 6)
    await ctx.render(
        'home/intro', //渲染用ctx.render,index是页面
        {
            title: '医院概况',
            content:res.infoContent
        } 
    );
});
// 通知公告
router.get('/home/notice', async (ctx, next) => {
    let noticeQuery = {
        pageNum: 1,
        pageSize: 10,
        noticeType:'2'
    };
    let noticeList = await Generic.getList('Notice', noticeQuery);
    await ctx.render(
        'home/notice', //渲染用ctx.render,index是页面
        {
            title: '通知公告',
            noticeList:noticeList.rows,
            pagination:{
                pageNum: noticeQuery.pageNum,
                pageSize: noticeQuery.pageSize,
                total:noticeList.count
            },
            moment:moment
        } 
    );
});
// 公告详情
router.get('/home/notice/:id', async (ctx, next) => {
    let v = new Validator(ctx)
    let detail = await Generic.getById('Notice', v.get('id'))
    console.log('detail',v.get('id'))
    await ctx.render(
        'home/noticeDetail', //渲染用ctx.render,index是页面
        {
            title: '通知公告详情',
            detail:detail,
            moment:moment
        } 
    );
});
// 院务公开
router.get('/home/publicity', async (ctx, next) => {
    let publicityQuery = {
        pageNum: 1,
        pageSize: 10,
        noticeType:'1'
    };
    let publicityList = await Generic.getList('Notice', publicityQuery);
    await ctx.render(
        'home/publicity', //渲染用ctx.render,index是页面
        {
            title: '院务公开',
            publicityList:publicityList.rows,
            pagination:{
                pageNum: publicityQuery.pageNum,
                pageSize: publicityQuery.pageSize,
                total:publicityList.count
            },
            moment:moment
        } 
    );
});
// 公示详情
router.get('/home/publicity/:id', async (ctx, next) => {
    let v = new Validator(ctx)
    let detail = await Generic.getById('Notice', v.get('id'))
    console.log('detail',v.get('id'))
    await ctx.render(
        'home/publicityDetail', //渲染用ctx.render,index是页面
        {
            title: '院务公开详情',
            detail:detail,
            moment:moment
        } 
    );
});
// 联系我们
router.get('/home/about', async (ctx, next) => {
    res = await Generic.getById('Info', 7)
    await ctx.render(
        'home/about', //渲染用ctx.render,index是页面
        {
            title: '联系我们',
            content:res.infoContent
        } 
    );
});

module.exports = router;
