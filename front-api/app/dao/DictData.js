const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;

class DictData {
  // 通过id单条数据
  static async getByDictType (params) {
    if ( Number(params)) {
      return await Models.DictData.findOne({
        where: {
          id: params
        }
      })
    } else {
      return await Models.DictData.findAll({
        where: {
          dictType: params
        }
      })
    }
  }
}

module.exports = DictData