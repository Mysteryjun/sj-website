'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Menu.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    parentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '父Id'
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '菜单名称'
    },
    path: {
      type: DataTypes.STRING,
      comment: '菜单路径'
    },
    name: {
      type: DataTypes.STRING,
      comment: '名称'
    },
    component: {
      type: DataTypes.STRING,
      comment: '组件路径'
    },
    is_frame: {
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '是否为外链（0是 1否）'
    },
    menu_type: {
      type: DataTypes.STRING,
      defaultValue: 'M',
      comment: '菜单类型（M目录 C菜单 F按钮）'
    },
    visible: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '菜单显示状态（0显示 1隐藏）'
    },
    orderNum: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '显示顺序'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '菜单状态（0正常 1停用）'
    },
    perms: {
      type: DataTypes.STRING,
      comment: '权限标识'
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: '#',
      comment: '图标'
    },
    isDelete: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '删除标志（0代表存在 1代表删除）'
    },
    remark: {
      type: DataTypes.STRING,
      comment: '备注'
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: '创建时间'
    },
    createdBy: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '创建者'
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: '更新时间'
    },
    updatedBy: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '更新者'
    }
  }, {
    sequelize,
    modelName: 'Menu',
    tableName: 'menus'
  });
  Menu.associate = function(models) {
    // associations can be defined here
    Menu.belongsToMany(models.Role, { through: 'RoleMenu', as: 'roles'});
  };
  return Menu;
};