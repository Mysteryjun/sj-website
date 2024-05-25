const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;

class Role {
  // 特殊业务特殊处理，否则调用Generic通用类

  static async getList (query) {
    let where = {}
    for (let key in query) {
      if (key !== 'pageNum' && key !== 'pageSize') {
        where[key] = {
          // 模糊查询
          [Op.like]:'%' + query[key] + '%'
        }
      }
    }
    return await Models['Role'].findAndCountAll({
      offset: (parseInt(query.pageNum) - 1) * parseInt(query.pageSize),
      limit: parseInt(query.pageSize),
      where,
      order: [
        ['roleSort', 'ASC']
      ]
    })
  }
  // 通过id单条数据
  static async getById (id) {
    return await Models['Role'].findOne({
      where: {
        id
      },
      include: [{
        model: Models['Menu'],
        as: 'menus',
        attributes: ['id', 'parentId', 'title']
      }],
    })
  }
  // 新增角色事务
  static async addTransaction (ctx, query, menuIds) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.Role.create(query, {transaction: t}).then(function (role) {
        let menuQuery = []
        for (let i = 0; i < menuIds.length; i++) {
          let obj = {}
          obj.roleId = role.get('id')
          obj.menuId = menuIds[i]
          menuQuery.push(obj)
        }
        console.log(menuQuery)
        return Models.RoleMenu.bulkCreate(menuQuery, {transaction: t});
      });
    }).then(function (result) {
      // 事务已被提交
      // result 是 promise 链返回到事务回调的结果
      console.log(result)
      ctx.body = global.success(100020, null)
    }).catch(function (err) {
      console.log(err.name)
      ctx.status = 500
      if (err.name === 'SequelizeUniqueConstraintError') {
        ctx.body = global.success(200013, null)
      } else {
        ctx.body = global.success(100021, null)
      }
      // 事务已被回滚
      // err 是拒绝 promise 链返回到事务回调的错误
    });
  }

  // 修改角色事务
  static async updateTransaction (ctx, query, menuIds, id) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.Role.update(query, {
        where: {
          id
        },
        transaction: t
      }).then(async function (role) {
        console.log(id)
        await Models.RoleMenu.destroy({
          where: {
            roleId: id
          }
        })
        let menuQuery = []
        for (let i = 0; i < menuIds.length; i++) {
          let obj = {}
          obj.roleId = id
          obj.menuId = menuIds[i]
          menuQuery.push(obj)
        }
        return await Models.RoleMenu.bulkCreate(menuQuery, {transaction: t});
      });
    }).then(function (result) {
      // 事务已被提交
      // result 是 promise 链返回到事务回调的结果
      console.log(result)
      ctx.body = global.success(100030, null)
    }).catch(function (err) {
      console.log(err.name)
      ctx.status = 500
      if (err.name === 'SequelizeUniqueConstraintError') {
        ctx.body = global.success(200013, null)
      } else {
        ctx.body = global.success(100031, null)
      }
      // 事务已被回滚
      // err 是拒绝 promise 链返回到事务回调的错误
    });
  }

  // 删除
  static async delTransaction (ctx, ids = []) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.Role.destroy({
        where: {
          id: {
            [Op.or]: ids
          }
        }
      }).then(async function (role) {
        console.log(ids)
        await Models.RoleMenu.destroy({
          where: {
            roleId: {
              [Op.or]: ids
            }
          }
        })
      });
    }).then(function (result) {
      // 事务已被提交
      // result 是 promise 链返回到事务回调的结果
      console.log(result)
      ctx.body = global.success(100040, null)
    }).catch(function (err) {
      console.log(err.name)
      ctx.status = 500
      ctx.body = global.success(100041, null)
      // 事务已被回滚
      // err 是拒绝 promise 链返回到事务回调的错误
    });
  }
}

module.exports = Role