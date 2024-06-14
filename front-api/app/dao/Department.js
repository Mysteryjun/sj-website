const Sequelize = require('sequelize');
const Models = require('../../models/index');
const Op = Sequelize.Op;
const { getWhere } = require('../utils/common');

class Department {
    // 获取所有列表
    static async getAll(query, order = [['createdAt', 'DESC']]) {
        let where = {};
        for (let key in query) {
            if (key !== 'pageNum' && key !== 'pageSize') {
                console.log(key);
                where[key] = {
                    // 模糊查询
                    [Op.like]: '%' + query[key] + '%',
                };
            }
        }
        return await Models['Department'].findAndCountAll({
            where,
            order,
            attributes: { exclude: ['content'] },
        });
    }

    // 通过id单条数据
    static async getById(deptId) {
        return await Models['Department'].findOne({
            where: {
                deptId,
            },
        });
    }

    // 删除
    static async del(ids = []) {
        return await Models['Department'].destroy({
            where: {
                deptId: {
                    [Op.or]: ids,
                },
            },
        });
    }
}

module.exports = Department;
