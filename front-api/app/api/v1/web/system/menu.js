const Router = require('koa-router');
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const Menu = require('../../../../dao/Menu')

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})


// 查询路由信息
router.get('/system/menu', async (ctx, next) => {
  let res = await Menu.getAll(ctx)
  ctx.body = global.success(100010, res)
})

// 获取某个路由
router.get('/system/menu/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await Generic.getById('Menu', v.get('id'))
  ctx.body = global.success(100010, res)
})

//  新增
router.post('/system/menu', async (ctx, next) => {
  let checkLists = ['parentId', 'title', 'is_frame', 'menu_type', 'visible', 'orderNum', 'status', 'roleIds'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    parentId: v.get('parentId'),
    name: v.get('component'),
    title: v.get('title'),
    path: v.get('path'),
    component: v.get('component'),
    is_frame: v.get('is_frame'),
    menu_type: v.get('menu_type'),
    visible: v.get('visible'),
    orderNum: v.get('orderNum'),
    status: v.get('status'),
    icon: v.get('icon'),
    perms: v.get('perms'),
  }

  if (v.get('component')) {
    query.name = v.get('component')
    query.component = v.get('component')
  }
  await Menu.addTransaction(ctx, query, v.get('roleIds'))
})

// 修改
router.put('/system/menu', async (ctx, next) => {
  let checkLists = ['id', 'parentId', 'title', 'is_frame', 'menu_type', 'visible', 'orderNum', 'status'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    parentId: v.get('parentId'),
    title: v.get('title'),
    path: v.get('path'),
    component: v.get('component'),
    is_frame: v.get('is_frame'),
    menu_type: v.get('menu_type'),
    visible: v.get('visible'),
    orderNum: v.get('orderNum'),
    status: v.get('status'),
    icon: v.get('icon'),
    perms: v.get('perms')
  }
  if (!v.get('component')) {
    query.name = null
  }
  let res = await Generic.update('Menu', query, {
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
router.delete('/system/menu/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  await Menu.delTransaction(ctx, ids)
})

module.exports = router
