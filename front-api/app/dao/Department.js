const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;
const { getWhere } = require('../utils/common')

class Department {
  // 获取所有列表
  static async getAll (ctx) {
    let where = {}
    where.deptId = getWhere(ctx).deptId

    return await Models['Department'].findAndCountAll({
      where,
      order: [
        ['createdAt', 'ASC']
      ]
    })
  }

  // 通过id单条数据
  static async getById (deptId) {
    return await Models['Department'].findOne({
      where: {
        deptId
      }
    })
  }

  // 删除
  static async del (ids = []) {
    return await Models['Department'].destroy({
      where: {
        deptId: {
          [Op.or]: ids
        }
      }
    })
  }
}

module.exports = Department