'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [{
      "deptId": 1,
      "userName": "admin",
      "nickName": "admin",
      "sex": "1",
      "password": "$2b$10$./tkPcqHWsAYsLqZezh92..DmQyZrxtLrn5SnwrSRasokXrVyvLr6", // 123456 加密后的密码
      "avatar": null,
      "email": "123ss@qq.com",
      "mobile": "13433666520",
      "isDelete": "0",
      "status": "0",
      "remark": "test",
      "createdBy": 'admin',
      "createdAt": new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
