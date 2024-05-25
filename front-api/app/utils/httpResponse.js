const httpResponse = function (code = 0, data = null) {
  return {
    code,
    data,
    msg: global.httpCode[code]
  }
}

module.exports = httpResponse