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
  singer: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'singer字段为字符串类型'
      }
    ]
  },
  url: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'url字段为字符串类型'
      }
    ]
  },
  poster_url: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'poster_url字段为字符串类型'
      }
    ]
  },
  type: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'type字段为字符串类型'
      }
    ]
  },
  lyric: {
    require: true,
    checkChildren: [
      {
        validator: check.checkStr,
        message: 'lyric字段为字符串类型'
      }
    ]
  },
}

module.exports = rules