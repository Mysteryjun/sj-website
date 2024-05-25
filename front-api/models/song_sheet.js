'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongSheet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SongSheet.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '用户id'
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '歌单'
    },
    poster_url: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '封面图url'
    },
    hot: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '热度'
    },
    comments: {
      type: DataTypes.STRING,
      comment: '简介'
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
    modelName: 'SongSheet',
    tableName: 'song_sheets',
  });
  SongSheet.associate = function(models) {
    // associations can be defined here
    SongSheet.belongsToMany(models.Song, { through: 'SongSheetSong' });
  };
  return SongSheet;
};