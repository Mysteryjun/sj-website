// http异常
class HttpException extends Error {
  constructor(msg = '服务器错误', data = null, code = 500) {
    super()
    this.data = data
    this.code = code
    this.msg = msg
  }
}

// 参数异常类
class ParameterException extends HttpException {
  constructor(msg) {
    super()
    this.msg = msg || '参数错误'
    this.code = 400
  }
}

// 资源未找到异常
class NotFound extends HttpException {
  constructor(msg) {
    super()
    this.msg = msg || '资源未找到'
    this.code = 404
  }
}

// 禁止访问
class Forbidden extends HttpException {
  constructor(msg) {
    super()
    this.msg = msg || '禁止访问'
    this.code = 403
  }
}

// 验证未通过异常
class AuthFailed extends HttpException {
  constructor(msg) {
    super()
    this.msg = msg || '授权失败'
    this.code = 401
  }
}


module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbidden,
}
