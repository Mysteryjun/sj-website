'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departments', {
      deptId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '父Id'
      },
      deptName: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '部门名称'
      },
      orderNum: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '显示顺序'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '部门状态（0正常 1停用）'
      },
      isDelete: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '删除标志（0代表存在 1代表删除）'
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
    await queryInterface.dropTable('departments');
  }
};