const check = require('../utils/chekFn')

const rules = {
  title: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'title字段为字符串类型'
      }
    ]
  },
  content: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'content字段为字符串类型'
      }
    ]
  }
}

module.exports = rules