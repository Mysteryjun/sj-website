const util = require('util')
const jwt = require('jsonwebtoken')
const { version, secret } = require('../config/config')
const { AuthFailed } = require('../utils/http-exception');
const { handleTree } = require('../utils/common');
const Generic = require('../dao/Generic');
const User = require('../dao/User')
const baseUrl = '/api/' + version
// api 白名单
const whiteList = [`${baseUrl}/login`, `${baseUrl}/captcha`, `${baseUrl}/logout`, `${baseUrl}/test/*`,
`${baseUrl}/system/notice`,
 `${baseUrl}/wx/*`,"/favicon.ico",
//  页面路由白名单
 "/","/style/*","/home/*"] 

// 校验有 /* 的白名单
const checkWhiteList = function (ctx, list) {
  list = list.map(item => item.substring(0, item.lastIndexOf('/*')))
  console.log(list, ctx.request.path)
  let flag = false
  list.forEach(item => {
    if (item === ctx.request.path.substring(0, item.length)) {
      flag = true
    }
  })
  return flag
}

// 校验token
const checkToken = () => {
  return async (ctx, next) => {
    console.log(ctx)
    parentWhiteLists = whiteList.filter(item => item.lastIndexOf('/*') !== -1)
    whiteLists = whiteList.filter(item => item.lastIndexOf('/*') === -1)
    // 不在白名单的路由
    console.log(!checkWhiteList(ctx, parentWhiteLists), !whiteLists.includes(ctx.request.path))
    if (!checkWhiteList(ctx, parentWhiteLists) && !whiteLists.includes(ctx.request.path)) {
      if (ctx.request.header.cookie) {
        // 第一种，安全性更高
        let jwtToken
        if (ctx.request.header.authorization) {
          jwtToken = ctx.request.header.authorization.split(' ')[1]
        }
        if (!jwtToken || jwtToken !== ctx.session.token) {
          throw new AuthFailed('token失效')
        }

        // 第二种，通过cookies传过来，比较方便
        // let cookies = ctx.request.header.cookie.split(';')
        // let obj = {}
        // cookies.forEach(item => {
        //   obj[item.split('=')[0].trim()] = item.split('=')[1].trim()
        // })
        // if (!obj.token || obj.token !== ctx.session.token) {
        //   throw new AuthFailed('token过期, 请重新登录')
        // }
        
        try {
          let payload = null
          const token = ctx.session.token
          const verify = util.promisify(jwt.verify) 
          // 解密token
          payload = await verify(token, secret)
          let user = await User.getById(payload.id)
          ctx.state.user = user // 保持用户信息
          let departments = await Generic.getAll('Department')
          ctx.state.departmentsObj = handleTree(departments.rows, 'deptId')
        } catch (error) {
          console.log(error)
          throw new AuthFailed('token不合法')
        }
      } else {
        throw new AuthFailed('请登录')
      }
    }
    await next()
  }
}

module.exports = checkToken;