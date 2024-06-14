// PC页面
const router = require('koa-router')();
const Generic = require('../../dao/Generic');
const Department = require('../../dao/Department');
const Validator = require('../../utils/validator');
const moment = require('moment');
// 首页
router.get('/', async (ctx, next) => {
    // 招标公告
    let noticeQuery = {
        pageNum: 1,
        pageSize: 6,
        noticeType: '2',
    };
    let noticeList = await Generic.getList('Notice', noticeQuery);
    // 院务公开
    let publicityQuery = {
        pageNum: 1,
        pageSize: 6,
        noticeType: '1',
    };
    let publicityList = await Generic.getList('Notice', publicityQuery);
    // 轮播图
    let bannerList = await Generic.getAll('Banner', { visible: '0' }, [['orderNum', 'DESC']]);
    // 科室导航
    let departmentList = await Department.getAll({}, [['orderNum', 'ASC']]);
    // 专家介绍
    let doctorList = await Generic.getAll('Content', { type: '1' });
    // 党建文化
    let cultureQuery = {
        type: '2',
        pageNum: 1,
        pageSize: 5,
    };
    let cultureList = await Generic.getList('Content', cultureQuery);
    await ctx.render(
        'index', //渲染用ctx.render,index是页面
        {
            title: '首页',
            noticeList: noticeList.rows,
            publicityList: publicityList.rows,
            bannerList: bannerList.rows,
            depList: departmentList.rows.filter(item => item.depth == 2),
            departmentList: departmentList.rows.filter(item => item.depth == 3),
            doctorList: doctorList.rows,
            cultureList: cultureList.rows,
            moment: moment,
        }
    );
});
// 医院概况
router.get('/home/intro', async (ctx, next) => {
    res = await Generic.getById('Info', 6);
    await ctx.render(
        'home/intro', //渲染用ctx.render,index是页面
        {
            title: '医院概况',
            content: res.infoContent,
        }
    );
});
// 科室导航
router.get('/home/department', async (ctx, next) => {
    // 科室导航
    let departmentList = await Department.getAll({}, [['orderNum', 'ASC']]);
    await ctx.render(
        'home/department', //渲染用ctx.render,index是页面
        {
            title: '科室导航',
            list: departmentList.rows.filter(item => item.depth == 2),
            departmentList: departmentList.rows.filter(item => item.depth == 3),
        }
    );
});
// 科室介绍
router.get('/home/department/:deptId', async (ctx, next) => {
    let v = new Validator(ctx);
    let detail = await Department.getById(v.get('deptId'));
    await ctx.render(
        'home/depDetail', //渲染用ctx.render,index是页面
        {
            title: '科室介绍',
            detail: detail,
            moment: moment,
        }
    );
});
// 专家介绍
router.get('/home/doctor', async (ctx, next) => {
    // 专家介绍
    let doctorList = await Generic.getAll('Content', { type: '1' });
    await ctx.render(
        'home/doctor', //渲染用ctx.render,index是页面
        {
            title: '专家介绍',
            doctorList: doctorList.rows,
        }
    );
});
// 专家介绍
router.get('/home/doctor/:id', async (ctx, next) => {
    let v = new Validator(ctx);
    let detail = await Generic.getById('Content', v.get('id'));
    await ctx.render(
        'home/docDetail', //渲染用ctx.render,index是页面
        {
            title: '专家介绍',
            detail: detail,
            moment: moment,
        }
    );
});

// 公告通知
router.get('/home/notice', async (ctx, next) => {
    let noticeQuery = {
        pageNum: 1,
        pageSize: 10,
        noticeType: '2',
    };
    let noticeList = await Generic.getList('Notice', noticeQuery);
    await ctx.render(
        'home/notice', //渲染用ctx.render,index是页面
        {
            title: '公告通知',
            noticeList: noticeList.rows,
            pagination: {
                pageNum: noticeQuery.pageNum,
                pageSize: noticeQuery.pageSize,
                total: noticeList.count,
            },
            moment: moment,
        }
    );
});
// 公告详情
router.get('/home/notice/:id', async (ctx, next) => {
    let v = new Validator(ctx);
    let detail = await Generic.getById('Notice', v.get('id'));
    await ctx.render(
        'home/noticeDetail', //渲染用ctx.render,index是页面
        {
            title: '公告通知详情',
            detail: detail,
            moment: moment,
        }
    );
});
// 院务公开
router.get('/home/publicity', async (ctx, next) => {
    let publicityQuery = {
        pageNum: 1,
        pageSize: 10,
        noticeType: '1',
    };
    let publicityList = await Generic.getList('Notice', publicityQuery);
    await ctx.render(
        'home/publicity', //渲染用ctx.render,index是页面
        {
            title: '院务公开',
            publicityList: publicityList.rows,
            pagination: {
                pageNum: publicityQuery.pageNum,
                pageSize: publicityQuery.pageSize,
                total: publicityList.count,
            },
            moment: moment,
        }
    );
});
// 公示详情
router.get('/home/publicity/:id', async (ctx, next) => {
    let v = new Validator(ctx);
    let detail = await Generic.getById('Notice', v.get('id'));
    await ctx.render(
        'home/publicityDetail', //渲染用ctx.render,index是页面
        {
            title: '院务公开详情',
            detail: detail,
            moment: moment,
        }
    );
});
// 联系我们
router.get('/home/about', async (ctx, next) => {
    res = await Generic.getById('Info', 7);
    await ctx.render(
        'home/about', //渲染用ctx.render,index是页面
        {
            title: '联系我们',
            content: res.infoContent,
        }
    );
});
// 党建文化
router.get('/home/culture', async (ctx, next) => {
    let query = {
        pageNum: 1,
        pageSize: 10,
        type: '2',
    };
    let list = await Generic.getList('Content', query);
    await ctx.render(
        'home/culture', //渲染用ctx.render,index是页面
        {
            title: '党建文化',
            list: list.rows,
            pagination: {
                pageNum: query.pageNum,
                pageSize: query.pageSize,
                total: list.count,
            },
            moment: moment,
        }
    );
});
// 党建文化详情
router.get('/home/culture/:id', async (ctx, next) => {
    let v = new Validator(ctx);
    let detail = await Generic.getById('Content', v.get('id'));
    await ctx.render(
        'home/cultureDetail', //渲染用ctx.render,index是页面
        {
            title: '党建文化详情',
            detail: detail,
            moment: moment,
        }
    );
});
module.exports = router;
