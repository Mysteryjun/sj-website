'use strict';
const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    deptId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '部门deptId'
    },
    userName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      comment: '用户名'
    },
    nickName: {
      type: DataTypes.STRING,
      defaultValue: null,
      comment: '昵称'
    },
    sex: {
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '性别（0代表女 1代表男）'
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '密码',
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: null,
      comment: '头像'
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '邮箱'
    },
    mobile: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '手机号'
    },
    isDelete: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '删除标志（0代表存在 1代表删除）'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '帐号状态（0正常 1停用）'
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
    modelName: 'User',
    tableName: 'users',
    defaultScope: {
      attributes: {
        // exclude: ['password'] // 返回的数据排除这些字段
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Department, {
      foreignKey: 'deptId'
    });
    User.belongsToMany(models.Role, { through: 'UserRole', as: 'roles' });
  };
  return User;
};