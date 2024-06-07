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
  imgUrl: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'imgUrl字段为字符串类型'
      }
    ]
  },
  visible: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'visible字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  orderNum: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'orderNum字段为数字类型'
      }
    ]
  }
}

module.exports = rules