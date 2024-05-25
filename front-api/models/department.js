'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Department.init({
    deptId: {
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
    deptName: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '部门名称'
    },
    orderNum: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '显示顺序'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '部门状态（0正常 1停用）'
    },
    isDelete: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '删除标志（0代表存在 1代表删除）'
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
    modelName: 'Department',
    tableName: 'departments'
  });
  
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasOne(models.User, {
      foreignKey: 'deptId'
    });
  };
  return Department;
};