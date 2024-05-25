'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dict_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dictName: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '字典名称'
      },
      dictType: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '字典类型'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '菜单状态（0正常 1停用）'
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
    await queryInterface.dropTable('dict_types');
  }
};