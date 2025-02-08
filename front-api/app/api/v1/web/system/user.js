const Router = require('koa-router');
const bcrypt = require("bcrypt"); // 加密算法
const Validator = require('../../../../utils/validator');
const { version } = require('../../../../config/config');
const Generic = require('../../../../dao/Generic')
const User = require('../../../../dao/User')
const Menu = require('../../../../dao/Menu')


const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

// 登录获取用户信息
router.get('/system/getInfo', async (ctx, next) => {
 
  if (ctx.state.user.id === 1) {
    ctx.body = global.success(0, {
      permissions:[
        "*:*:*"
      ],
      user: ctx.state.user
    })
  } else {
    let lists = await Menu.getAll(ctx)
    let permissions = lists.rows.map(item=>item.perms) 
    ctx.body = global.success(0, {
      permissions,
      user: ctx.state.user
    })
  }
})

// 获取用户
router.get('/system/user', async (ctx, next) => {
  let checkLists = ['pageNum', 'pageSize'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let userName = ctx.query.userName ? ctx.query.userName : ''
  let deptId = ctx.query.deptId ? ctx.query.deptId : ''
  let status = ctx.query.status ? ctx.query.status : ''
  let pageNum = ctx.query.pageNum ? ctx.query.pageNum : 1
  let pageSize = ctx.query.pageSize ? ctx.query.pageSize : 10
  let query = {
    userName,
    deptId,
    status,
    pageNum,
    pageSize
  }
  let userList = await User.getList(ctx, query)
  ctx.body = global.success(100010, userList)
})

// 获取某个用户
router.get('/system/user/:id', async (ctx, next) => {
  let checkLists = ['id']
  let v = new Validator(ctx)
  v.check(checkLists)
  let res = await User.getById(v.get('id'))
  ctx.body = global.success(100010, res)
})

// 新增用户
router.post('/system/user', async (ctx, next) => {
  let checkLists = ['userName', 'password', 'deptId', 'roleIds'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    userName: v.get('userName'),
    password: v.get('password'),
    deptId: v.get('deptId'),
    nickName: v.get('nickName'),
    sex: v.get('sex'),
    avater: v.get('avater'),
    email: v.get('email'),
    mobile: v.get('mobile'),
    remark: v.get('remark'),
  }
  await User.addTransaction(ctx, query, v.get('roleIds'))
  
})

// 修改密码
router.put('/system/user/:id/resetPwd', async (ctx, next) => {
  let checkLists = ['id', 'password', 'newPassword'] // 要校验的字段
  let v = new Validator(ctx);
  v.check(checkLists)
  let user = await Generic.getById('User', v.get('id'));
  let checkPwd = await bcrypt.compare(v.get('password'), user.get('password')) // 对比两次密码是否一致
  if (!checkPwd) {
    ctx.status = 500
    return ctx.body = global.success(200012, null)
  }
  let query = {
    password: v.get('newPassword')
  }
  let res = await Generic.update('User', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 修改用户状态
router.put('/system/user/:id/updateStatus', async (ctx, next) => {
  let checkLists = ['id', 'status'] // 要校验的字段
  let v = new Validator(ctx);
  v.check(checkLists)
  let query = {
    status: v.get('status')
  }
  let res = await Generic.update('User', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 超级管理员修改密码
router.put('/system/user/:id/adminResetPwd', async (ctx, next) => {
  let checkLists = ['id', 'newPassword'] // 要校验的字段
  let v = new Validator(ctx);
  v.check(checkLists)
  let query = {
    password: v.get('newPassword')
  }
  let res = await Generic.update('User', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 修改用户
router.put('/system/user', async (ctx, next) => {
	let checkLists = ['id', 'deptId', 'roleIds'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    deptId: v.get('deptId'),
    nickName: v.get('nickName'),
    sex: v.get('sex'),
    avater: v.get('avater'),
    email: v.get('email'),
    mobile: v.get('mobile'),
    remark: v.get('remark'),
  }
  await User.updateTransaction(ctx, query, v.get('roleIds'), v.get('id'))
})

// 修改用户图片
router.put('/system/updateUserImg', async (ctx, next) => {
	let checkLists = ['id', 'avatar'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let query = {
    avatar: v.get('avatar')
  }
  console.log(999999999)
  let res = await Generic.update('User', query, {
    id: v.get('id')
  })
  if (res) {
    ctx.body = global.success(100030, null)
  } else {
    ctx.status = 500
    ctx.body = global.success(100031, null)
  }
})

// 删除用户
router.delete('/system/user/:ids', async (ctx, next) => {
  let checkLists = ['ids'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  let ids = v.get('ids').split(',');

  await User.delTransaction(ctx, ids)
})

module.exports = router