const check = require('../utils/chekFn')

const rules = {
  deptId: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'deptId字段为数字类型'
      }
    ]
  },
  deptName: {
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'deptName字段为字符串类型'
      }
    ]
  },
  orderNum:{
    checkChildren:  [
      {
        validator: check.checkNumber,
        message: 'orderNum字段为数字类型'
      }
    ]
  }
}

module.exports = rules