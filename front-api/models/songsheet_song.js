'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongSheetSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SongSheetSong.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    songSheetId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '歌单id',
      references: {
        model: Model.Song,
        key: 'id'
      }
    },
    songId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: '歌曲id',
      references: {
        model: Model.SongSheet,
        key: 'id'
      }
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
    modelName: 'SongSheetSong',
    tableName: 'songSheet_songs'
  });
  return SongSheetSong;
};