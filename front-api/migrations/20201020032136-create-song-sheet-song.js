'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songSheet_songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songSheetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '歌单id'
      },
      songId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '歌曲id'
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
    await queryInterface.dropTable('songSheet_songs');
  }
};