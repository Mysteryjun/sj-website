const check = require('../utils/chekFn')

const rules = {
  noticeTitle: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'noticeTitle字段为字符串类型'
      }
    ]
  },
  noticeContent: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'noticeContent字段为字符串类型'
      }
    ]
  }
}

module.exports = rules