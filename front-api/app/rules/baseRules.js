const check = require('../utils/chekFn')

// 参数规则, 公共参数
const rules = {
  id: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'id字段为数字类型'
      }
    ]
  },
  ids: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'ids字段为格式为："1, 2"'
      }
    ]
  },
  parentId: {
    require: true, 
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'parentId字段为数字类型'
      }
    ]
  },
  captcha: {
    require: true, 
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'captcha字段不能为空'
      },
      {
        validator: check.checkCaptcha,
        message: '验证码不正确'
      }
    ]
  },
  pageNum: {
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'pageNum字段为数字类型'
      }
    ]
  },
  pageSize:{
    checkChildren:  [
      {
        validator: check.checkNumber,
        message: 'pageSize字段为数字类型'
      }
    ]
  },
  file: {
    require: true,
    checkChildren: [
      {
        validator: check.checkFile,
        message: '上传文件类型不正确'
      }
    ]
  }
}

module.exports = rules