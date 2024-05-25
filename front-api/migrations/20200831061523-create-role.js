'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roleName: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '角色名称'
      },
      roleKey: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '角色权限字符串'
      },
      roleSort: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '显示顺序'
      },
      dataScope: {
        type: Sequelize.STRING,
        defaultValue: '1',
        comment: '数据范围（1：本部门及以下数据权限 2：本部门数据权限 3：仅本人权限）'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '角色状态（0正常 1停用）'
      },
      isDelete: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '删除标志（0代表存在 1代表删除）'
      },
      remark: {
        type: Sequelize.STRING,
        comment: '备注'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: '创建时间'
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '创建者'
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: '更新时间'
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '更新者'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};