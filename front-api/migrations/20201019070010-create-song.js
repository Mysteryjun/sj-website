'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '用户id'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '歌名'
      },
      singer: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '歌手'
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '音乐链接'
      },
      poster_url: {
        type: Sequelize.STRING,
        comment: '封面图url'
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '所属类型'
      },
      lyric: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '歌词'
      },
      hot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '热度'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: '创建时间'
      },
      createdBy: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '创建者'
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        comment: '更新时间'
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.STRING,
        comment: '更新者'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  }
};