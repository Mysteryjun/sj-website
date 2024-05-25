/**
 * 
 * @param {要校验的数据} data 
 * @param {类型} types 'string' 或者 ['string', 'number']
 */
const checkTypes = function (data, types) {
  let flag = false
  if (data && typeof types === 'string' && typeof data === types) {
    flag = true
  } else if (data && types instanceof Array) {
    types.forEach(item => {
      console.log(item)
      if (typeof data === item) {
        flag = true
      }
    })
  }
  return flag
}

// 校验是否为空字符串
const checkStr = function (data) {
  if (checkTypes(data, 'string') && data.trim()) {
    return true
  }
  return false
}

// 校验是否为数字
const checkNumber = function (data) {
  if (typeof parseInt(data) === 'number') {
    return true
  }
  return false
}

// 校验长度
const checkLen = function (data) {
  if (checkTypes(data, 'string') && data.trim().length >= 6 && data.trim().length <= 16) {
    return true
  }
  return false
}

// 校验文件
const checkFile = function (data) {
  if (data && data.path && data.size) {
    return true
  }
  return false
}

//  校验验证码
const checkCaptcha = function (data, ctx) {
  if (data && ctx.session.captcha && data.toLowerCase() === ctx.session.captcha.toLowerCase()) {
    ctx.session.captcha = null // 调用登录接口后，验证码失效，需重新获取
    return true
  }
  ctx.session.captcha = null // 调用登录接口后，验证码失效，需重新获取
  return false
}

//  校验数组
const checkArray = function (data) {
  if (data && Object.prototype.toString.call(data)== '[object Array]') {
    return true
  }
  return false
}

module.exports = {
  checkStr,
  checkLen,
  checkFile,
  checkNumber,
  checkCaptcha,
  checkArray
}