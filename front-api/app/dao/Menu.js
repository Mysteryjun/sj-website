const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;

class Menu {
  // 特殊业务特殊处理，否则调用Generic通用类
  // 获取所有列表
  static async getAll (ctx) {
    let roleIds = ctx.state.user.roles.map(item => item.id)
    let lists = await Models['RoleMenu'].findAll({
      where: {
        roleId: {
          [Op.or]: roleIds
        }
      }
    })
    let menuIds = [...new Set(lists.map(item => item.menuId))]
    return await Models['Menu'].findAndCountAll({
      where: {
        id: {
          [Op.or]: menuIds
        }
      },
      order: [
        ['orderNum', 'ASC']
      ]
    })
  }

  // 新增菜单事务
  static async addTransaction (ctx, query, roleIds) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.Menu.create(query, {transaction: t}).then(function (menu) {
        let menuQuery = []
        for (let i = 0; i < roleIds.length; i++) {
          let obj = {}
          obj.roleId = roleIds[i]
          obj.menuId = menu.get('id')
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
      ctx.body = global.success(100021, null)
      // 事务已被回滚
      // err 是拒绝 promise 链返回到事务回调的错误
    });
  }

  // 删除
  static async delTransaction (ctx, id) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.Menu.destroy({
        where: {
          id
        }
      }).then(async function () {
        await Models.RoleMenu.destroy({
          where: {
            menuId: id
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

module.exports = Menu