const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;

// 通用增删改查类
class Generic {
  // 获取所有列表
  static async getAll (tableName, query, order=[['createdAt', 'DESC']]) {
    let where = {}
    for (let key in query) {
      if (key !== 'pageNum' && key !== 'pageSize') {
        console.log(key)
        where[key] = {
          // 模糊查询
          [Op.like]:'%' + query[key] + '%'
        }
      }
    }
    return await Models[tableName].findAndCountAll({
      where,
      order
    })
  }

  // 分页获取列表
  static async getList (tableName, query, order=[['createdAt', 'DESC']]) {
    let where = {}
    for (let key in query) {
      if (key !== 'pageNum' && key !== 'pageSize') {
        console.log(key)
        where[key] = {
          // 模糊查询
          [Op.like]:'%' + query[key] + '%'
        }
      }
    }
    return await Models[tableName].findAndCountAll({
      offset: (parseInt(query.pageNum) - 1) * parseInt(query.pageSize),
      limit: parseInt(query.pageSize),
      where,
      order
    })
  }

  // 通过id单条数据
  static async getById (tableName, id) {
    return await Models[tableName].findOne({
      where: {
        id
      }
    })
  }

  // 新增
  static async create (tableName, params) {
    return await Models[tableName].create(params)
  }

  // 批量新增
  static async bulkCreate (tableName, params) {
    return await Models[tableName].bulkCreate(params)
  }

  // 修改
  static async update (tablenName, params, where) {
    return await Models[tablenName].update(
      params,
      {
        where
      }
    )
  }

  // 删除
  static async del (tablenName, ids = []) {
    return await Models[tablenName].destroy({
      where: {
        id: {
          [Op.or]: ids
        }
      }
    })
  }
}

module.exports = Generic