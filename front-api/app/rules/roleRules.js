const check = require('../utils/chekFn')

// 参数规则
const rules = {
  roleName: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'roleName字段为字符串类型'
      }
    ]
  },
  menuIds: {
    require: true,
    checkChildren: [
      {
        validator: check.checkArray,
        message: 'menuIds字段为数组类型'
      }
    ]
  },
  roleKey: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'roleKey字段为字符串类型'
      }
    ]
  },
  roleSort: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'roleSort字段为数字类型'
      }
    ]
  }
}

module.exports = rules