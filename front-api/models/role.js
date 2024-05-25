'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Role.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '角色名称'
    },
    roleKey: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '角色权限字符串'
    },
    roleSort: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '显示顺序'
    },
    dataScope: {
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '数据范围（1：本部门及以下数据权限 2：本部门数据权限 3：仅本人权限）'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '角色状态（0正常 1停用）'
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
    modelName: 'Role',
    tableName: 'roles'
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.User, { through: 'UserRole', as: 'users'});
    Role.belongsToMany(models.Menu, { through: 'RoleMenu', as: 'menus'});
  };
  return Role;
};