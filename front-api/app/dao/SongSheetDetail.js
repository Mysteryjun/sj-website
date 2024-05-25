const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;

class SongSheetDetail {
  // 特殊业务特殊处理，否则调用Generic通用类
  
  // 分页获取列表
  static async getAll (ctx, songSheetId) {
    let data
    if (parseInt(songSheetId)) {
      data = await Models['SongSheetSong'].findAll({
        where: {
          songSheetId: songSheetId
        }
      })
    } else {
      return null
    }
    
    let songIds = data.map(list => list.songId).length ? data.map(list => list.songId) : [0]
    let where = {}
    where.id = {
      [Op.or]: songIds
    }
    return await Models['Song'].findAndCountAll({
      where,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  static async getList (ctx, query, songSheetId) {
    let data
    if (parseInt(songSheetId)) {
      data = await Models['SongSheetSong'].findAll({
        where: {
          songSheetId: songSheetId
        }
      })
    } else {
      return null
    }
    
    let songIds = data.map(list => list.songId).length ? data.map(list => list.songId) : [0]
    let where = {}
    for (let key in query) {
      if (key !== 'pageNum' && key !== 'pageSize') {
        where[key] = {
          // 模糊查询
          [Op.like]:'%' + query[key] + '%'
        }
      }
    }
    where.id = {
      [Op.or]: songIds
    }
    return await Models['Song'].findAndCountAll({
      offset: (parseInt(query.pageNum) - 1) * parseInt(query.pageSize),
      limit: parseInt(query.pageSize),
      where,
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  // 批量新增
  static async bulkCreate (ctx) {
    return Models.sequelize.transaction(function (t) {
      return Models.SongSheetSong.destroy({
        where: {
          songSheetId: parseInt(ctx.params.songSheetId)
        }
      }, {transaction: t}).then(function (res) {
        let list = []
        for (let i = 0; i < ctx.request.body.songIds.length; i++) {
          let obj = {}
          obj.songSheetId = parseInt(ctx.params.songSheetId)
          obj.songId =ctx.request.body.songIds[i]
          list.push(obj)
        }
        return Models.SongSheetSong.bulkCreate(list, {transaction: t});
      });
    }).then(function (result) {
      // 事务已被提交
      // result 是 promise 链返回到事务回调的结果
      console.log(result)
      ctx.body = global.success(100020, null)
    }).catch(function (err) {
      console.log(err.name)
      ctx.status = 500
      ctx.body = global.success(100021, null)
      // 事务已被回滚
      // err 是拒绝 promise 链返回到事务回调的错误
    });
  }

  // 删除
  static async del (ids = []) {
    return await Models['SongSheetSong'].destroy({
      where: {
        songId: {
          [Op.or]: ids
        }
      }
    })
  }
}

module.exports = SongSheetDetail