'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Content.init({
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
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: '1',
      comment: '类型（1 专家介绍 2党建文化）'
    },
    job: {
      type: DataTypes.STRING,
      comment: '职位'
    },
    role: {
      type: DataTypes.STRING,
      comment: '职称'
    },
    deptId: {
      type: DataTypes.INTEGER,
      comment: '所属部门ID'
    }, 
    deptName: {
      type: DataTypes.STRING,
      comment: '所属部门'
    },    
    desc: {
      type: DataTypes.STRING,
      comment: '擅长'
    },
    imgUrl: {
      type: DataTypes.STRING,
      comment: '图片地址'
    },
    content: {
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
    modelName: 'Content',
    tableName: 'content'
  });
  return Content;
};