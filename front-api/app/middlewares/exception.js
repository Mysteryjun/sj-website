const { HttpException } = require('../utils/http-exception')
const { logger } = require('./logger');

// 统一处理异常中间件
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 记录错误日志
    logger.error(error)
    // 不是 HttpException 的情况下且在开发环境，错误抛出
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        data: error.data,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: '抱歉，未知的错误',
        code: 100000,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
