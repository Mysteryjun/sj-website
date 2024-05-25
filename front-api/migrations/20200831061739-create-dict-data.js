'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dict_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dictSort: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '字典排序'
      },
      dictLabel: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '字典标签'
      },
      dictValue: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '字典键值'
      },
      dictType: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '字典类型'
      },
      cssClass: {
        type: Sequelize.STRING,
        comment: '样式属性（其他样式扩展）'
      },
      listClass: {
        type: Sequelize.STRING,
        comment: '表格回显样式'
      },
      isDefault: {
        type: Sequelize.STRING,
        defaultValue: 'Y',
        comment: '是否默认（Y是 N否）'
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
    await queryInterface.dropTable('dict_datas');
  }
};