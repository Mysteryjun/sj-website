'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deptId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '部门deptId'
      },
      userName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        comment: '用户名'
      },
      nickName: {
        type: Sequelize.STRING,
        defaultValue: null,
        comment: '昵称'
      },
      sex: {
        type: Sequelize.STRING,
        defaultValue: '1',
        comment: '性别（0代表女 1代表男）'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '密码'
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: null,
        comment: '头像'
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '邮箱'
      },
      mobile: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '手机号'
      },
      isDelete: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '删除标志（0代表存在 1代表删除）'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '帐号状态（0正常 1停用）'
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
    await queryInterface.dropTable('users');
  }
};