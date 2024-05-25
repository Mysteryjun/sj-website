const check = require('../utils/chekFn')

// 参数规则
const rules = {
  roleId: [
    {
      require: true,
      checkChildren: [
        {
          validator: check.checkNumber,
          message: 'roleId字段为数字类型'
        }
      ]
    }
  ],
  name: {
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'name字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  title: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'menuName字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  path: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'path字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  component: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'componentPath字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  is_frame: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'is_frame字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  menu_type: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'menu_type字段为字符串类型, 且不能为空字符串'
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
  },
  status: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'status字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  icon: {
    require: false,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'icon字段为字符串类型, 且不能为空字符串'
      }
    ]
  },
  perms: {
    require: false,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'perms字段为字符串类型, 且不能为空字符串'
      }
    ]
  }
}

module.exports = rules