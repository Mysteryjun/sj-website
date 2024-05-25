const Sequelize = require('sequelize');
const Models = require('../../models/index');
const { getWhere } = require('../utils/common')
const Op = Sequelize.Op;

class User {
  // 特殊业务特殊处理，否则调用Generic通用类
  // 获取所有有权限的用户列表
  static async getAllUser (ctx, query) {
    let where = getWhere(ctx)
    return await Models['User'].findAndCountAll({
      attributes: ['id', 'userName', 'nickName', 'avatar', 'deptId', 'status', 'mobile', 'createdAt', 'password'],
      where,
      order: [
        ['createdAt', 'DESC'] 
      ]
    })
  }
  
  // 分页获取列表
  static async getList (ctx, query) {
    let where = {}
    for (let key in query) {
      if (key !== 'pageNum' && key !== 'pageSize') {
        if (key === 'deptId' && !query.deptId) {
          where[key] = getWhere(ctx).deptId
          if (getWhere(ctx).id) {
            where.id = getWhere(ctx).id
          }
        } else if (key === 'deptId' && query.deptId) {
          where[key] = getWhere(ctx, {
            deptId: query.deptId
          }).deptId
        } else {
          where[key] = {
            // 模糊查询
            [Op.like]:'%' + query[key] + '%'
          }
        }
      }
    }
    return await Models['User'].findAndCountAll({
      offset: (parseInt(query.pageNum) - 1) * parseInt(query.pageSize),
      limit: parseInt(query.pageSize),
      attributes: ['id', 'userName', 'nickName', 'avatar', 'deptId', 'status', 'mobile', 'createdAt', 'password'],
      where,
      include: [{ // include关键字表示关联查询
        model: Models['Department'], // 指定关联的model
        // as:'Department', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: ['deptId', 'deptName', ['orderNum', 'order']], // 这里的attributes属性表示查询Department表的deptId, deptName和orderNum字段，其中对orderNum字段起了别名order
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    })
  }

  // 通过id单条数据
  static async getById (id) {
    return await Models['User'].findOne({
      where: {
        id
      },
      include: [{
        model: Models['Role'],
        as: 'roles',
        // attributes: ['id', 'roleName', 'roleKey']
      }],
    })
  }

  
  // 新增用户事务
  static async addTransaction (ctx, query, roleIds) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.User.create(query, {transaction: t}).then(function (user) {
        let roleQuery = []
        for (let i = 0; i < roleIds.length; i++) {
          let obj = {}
          obj.roleId = roleIds[i]
          obj.userId = user.get('id')
          roleQuery.push(obj)
        }
        console.log(roleQuery)
        return Models.UserRole.bulkCreate(roleQuery, {transaction: t});
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

  // 修改用户事务
  static async updateTransaction (ctx, query, roleIds, id) {
    return Models.sequelize.transaction(function (t) {
      // 在这里链接您的所有查询。 确保你返回他们。
      return Models.User.update(query, {
        where: {
          id
        },
        transaction: t
      }).then(async function (user) {
        console.log(id)
        await Models.UserRole.destroy({
          where: {
            userId: id
          }
        })
        let roleQuery = []
        for (let i = 0; i < roleIds.length; i++) {
          let obj = {}
          obj.roleId = roleIds[i]
          obj.userId = id
          roleQuery.push(obj)
        }
        console.log(roleQuery)
        return await Models.UserRole.bulkCreate(roleQuery, {transaction: t});
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
      return Models.User.destroy({
        where: {
          id: {
            [Op.or]: ids
          }
        }
      }).then(async function (role) {
        console.log(ids)
        await Models.UserRole.destroy({
          where: {
            userId: {
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

module.exports = User