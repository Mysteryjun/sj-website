'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('menus', {
      id: {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '菜单名称'
      },
      path: {
        type: Sequelize.STRING,
        comment: '菜单路径'
      },
      name: {
        type: Sequelize.STRING,
        comment: '名称'
      },
      component: {
        type: Sequelize.STRING,
        comment: '组件路径'
      },
      is_frame: {
        type: Sequelize.STRING,
        defaultValue: '1',
        comment: '是否为外链（0是 1否）'
      },
      menu_type: {
        type: Sequelize.STRING,
        defaultValue: 'M',
        comment: '菜单类型（M目录 C菜单 F按钮）'
      },
      visible: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '菜单显示状态（0显示 1隐藏）'
      },
      orderNum: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '显示顺序'
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: '0',
        comment: '菜单状态（0正常 1停用）'
      },
      perms: {
        type: Sequelize.STRING,
        comment: '权限标识'
      },
      icon: {
        type: Sequelize.STRING,
        defaultValue: '#',
        comment: '图标'
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
    await queryInterface.dropTable('menus');
  }
};