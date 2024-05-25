const check = require('../utils/chekFn')

const rules = {
  songSheetId: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'songSheetId字段为数字类型'
      }
    ]
  },
  songId: {
    require: true,
    checkChildren: [
      {
        validator: check.checkNumber,
        message: 'songId字段为数字类型'
      }
    ]
  },
  songIds: {
    require: true,
    checkChildren: [
      {
        validator: check.checkArray,
        message: 'songIds字段为格式为数组'
      }
    ]
  }
}

module.exports = rules