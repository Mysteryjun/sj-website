'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Info.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    infoTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '标题'
    },
    infoType: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '类型（1通知 2公告）'
    },
    infoContent: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '内容'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '状态（0正常 1停用）'
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
    modelName: 'Info',
    tableName: 'hospital_info'
  });
  return Info;
};