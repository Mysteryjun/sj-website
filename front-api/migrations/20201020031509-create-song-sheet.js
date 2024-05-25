'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('song_sheets', {
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
        comment: '歌单'
      },
      poster_url: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '封面图url'
      },
      hot: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '热度'
      },
      comments: {
        type: Sequelize.STRING,
        comment: '简介'
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
    await queryInterface.dropTable('song_sheets');
  }
};