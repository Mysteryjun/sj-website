'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Notice.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    noticeTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '公告标题'
    },
    noticeType: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '公告类型（1通知 2公告）'
    },
    noticeContent: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '公告内容'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '公告状态（0正常 1停用）'
    },
    remark: {
      type: DataTypes.STRING,
      comment: '备注'
    },
    fileName: {
      type: DataTypes.STRING,
      comment: '附件名称'
    },
    fileUrl: {
      type: DataTypes.STRING,
      comment: '附件路径'
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
    modelName: 'Notice',
    tableName: 'notices'
  });
  return Notice;
};