'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DictData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DictData.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    dictSort: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '字典排序'
    },
    dictLabel: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '字典标签'
    },
    dictValue: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '字典键值'
    },
    dictType: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '字典类型'
    },
    cssClass: {
      type: DataTypes.STRING,
      comment: '样式属性（其他样式扩展）'
    },
    listClass: {
      type: DataTypes.STRING,
      comment: '表格回显样式'
    },
    isDefault: {
      type: DataTypes.STRING,
      defaultValue: 'Y',
      comment: '是否默认（Y是 N否）'
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
    modelName: 'DictData',
    tableName: 'dict_datas'
  });
  return DictData;
};