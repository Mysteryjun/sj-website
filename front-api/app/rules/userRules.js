const check = require('../utils/chekFn')

// 参数规则
const rules = {
  userName: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'username字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  avatar: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'avatar字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  newPassword: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'password字段为字符串类型, 且不能为空字符串'
      },
      {
        validator: check.checkLen,
        message: 'password长度在6到16位之间'
      }
    ]
  },
  password: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'password字段为字符串类型, 且不能为空字符串'
      },
      {
        validator: check.checkLen,
        message: 'password长度在6到16位之间'
      }
    ]
  },
  deptId: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'deptId字段为数字类型'
      }
    ]
  },
  roleIds: {
    require: true,
    checkChildren: [
      {
        validator: check.checkArray,
        message: 'roleIds字段为数组类型'
      }
    ]
  }
}

module.exports = rules