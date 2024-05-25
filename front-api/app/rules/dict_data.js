const check = require('../utils/chekFn')

const rules = {
  dictSort: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'dictSort字段为数字类型'
      }
    ]
  },
  dictLabel: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'dictLabel字段为字符串类型'
      }
    ]
  },
  dictValue:{
    require: true,
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'dictValue字段为数字类型'
      }
    ]
  },
  params: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'params字段为字符串类型'
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
  },
  cssClass:{
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'cssClass字段为数字类型'
      }
    ]
  },
  listClass: {
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'listClass字段为字符串类型'
      }
    ]
  },
  isDefault:{
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'isDefault字段为数字类型'
      }
    ]
  },
  remark:{
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'remark字段为数字类型'
      }
    ]
  },
  createdBy:{
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'createdBy字段为数字类型'
      }
    ]
  },
  updatedBy:{
    checkChildren:  [
      {
        validator: check.checkStr,
        message: 'updatedBy字段为数字类型'
      }
    ]
  }
}

module.exports = rules