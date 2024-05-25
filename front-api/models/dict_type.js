'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DictType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DictType.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dictName: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '字典名称'
    },
    dictType: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '字典类型'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '菜单状态（0正常 1停用）'
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
    modelName: 'DictType',
    tableName: 'dict_types'
  });
  return DictType;
};