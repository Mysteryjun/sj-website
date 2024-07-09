const Router = require('koa-router');
const path = require('path')
const bcrypt = require("bcrypt"); // 加密算法
const svgCaptcha = require('svg-captcha')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator');
const { version, secret } = require('../../config/config');
const Models = require('../../../models/index');

const router = new Router({
  prefix: '/api/' + version // 路由统一前缀 /api/版本号
})

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: 登录
 *     description: 登录
 *     tags:
 *       - 用户模块
 *     consumes:
 *      - application/json
 *      - application/xml
 *     produces:
 *      - application/json
 *      - application/xml
 *     parameters: # 请求参数
 *       - name: userName
 *         description: 用户名
 *         in: query # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *       - name: password
 *         description: 用户密码
 *         in: query
 *         required: true
 *         type: string # 可能的值有string、number、file（文件）等
 *       - name: captcha
 *         description: 验证码
 *         in: query
 *         required: true
 *         type: string # 可能的值有string、number、file（文件）等
 *     responses:
 *       200:
 *         description: 登录成功
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *               example: 100010
 *             token:
 *               type: 'string'
 *             msg:
 *               type: 'string'
 *               example: '查询成功'
 */
router.post('/login', async (ctx, next) => {
  let checkLists = ['userName', 'password', 'captcha'] // 要校验的字段
  let v = new Validator(ctx);
  v.check(checkLists)
  let userName = v.get('userName');

  ctx.session.token = null // 之前的token失效
  let user = await Models.User.findOne({
    where: {
      userName,
      isDelete: 0
    }
  });
  if (user === null) {
    ctx.status = 500
    return ctx.body = global.success(100011, null)
  } else if (user.get('status') === '1') {
    return ctx.body = global.success(200014, null)
  }
  let checkPwd = await bcrypt.compare(v.get('password'), user.get('password')) // 对比两次密码是否一致
  if (!checkPwd) {
    ctx.status = 500
    return ctx.body = global.success(200012, null)
  }

  const token = jwt.sign(
    {
      id: user.get('id'),
      userName: user.get('userName')
    },
    secret,
    { expiresIn: '7d' }
  )
  ctx.session.token = token
  ctx.body = global.success(100010, {token})
});



// 登出
router.post('/logout', async (ctx, next) => {
  ctx.state = {}
  ctx.session.token = null
  ctx.body = global.success(0, null)
})

/**
 * @swagger
 * /api/v1/captcha:
 *   get:
 *     summary: 验证码
 *     description: 验证码
 *     tags:
 *       - 用户模块
 *     consumes:
 *      - image/svg+xml
 *     produces:
 *      - image/svg+xml
 *     responses:
 */
router.get('/captcha', async (ctx, next) => {
  const cap = svgCaptcha.create({
    size: 4, // 验证码长度
    width:160,
    height:50,
    fontSize: 60,
    ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#eee' // 验证码图片背景颜色
  })
  
  let img = cap.data // 验证码
  ctx.session.captcha = cap.text
  console.log(ctx.session.captcha)
  // let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
 
  // 设置响应头
  ctx.response.type = 'image/svg+xml';
 
  ctx.body = img;
});

// 上传图片
router.post('/upload', async (ctx, next) => {
  let checkLists = ['file'] // 要校验的字段
  let v = new Validator(ctx)
  v.check(checkLists)
  const file = v.get('file')

  const basename = path.basename(file.path)
  ctx.body = global.success(0, {
    path: `/upload/${basename}`
  })
})

module.exports = router