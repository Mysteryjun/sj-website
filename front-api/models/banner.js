'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '标题'
    },
    imgUrl: {
      type: DataTypes.STRING,
      comment: '图片地址'
    },
    jumpUrl: {
      type: DataTypes.STRING,
      comment: '跳转地址'
    },
    orderNum: {
      type: DataTypes.INTEGER,
      comment: '序号'
    },
    remark: {
      type: DataTypes.STRING,
      comment: '备注'
    },
    visible: {
      type: DataTypes.STRING,
      defaultValue: '0',
      comment: '菜单显示状态（0显示 1隐藏）'
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
    modelName: 'Banner',
    tableName: 'banner'
  });
  return Banner;
};