'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Song.init({
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
      comment: '歌名'
    },
    singer: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '歌手'
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '音乐链接'
    },
    poster_url: {
      type: DataTypes.STRING,
      comment: '封面图url'
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '所属类型'
    },
    lyric: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: '歌词'
    },
    hot: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '热度'
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
    modelName: 'Song',
    tableName: 'songs',
  });
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsToMany(models.SongSheet, { through: 'SongSheetSong' });
  };
  return Song;
};