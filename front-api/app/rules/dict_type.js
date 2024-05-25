const check = require('../utils/chekFn')

const rules = {
  dictName: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'dictName字段为字符串类型'
      }
    ]
  },
  dictType: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'dictType字段为字符串类型'
      }
    ]
  }
}

module.exports = rules