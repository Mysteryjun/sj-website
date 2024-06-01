const check = require('../utils/chekFn')

const rules = {
  infoTitle: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'infoTitle字段为字符串类型'
      }
    ]
  },
  infoContent: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'infoContent字段为字符串类型'
      }
    ]
  }
}

module.exports = rules