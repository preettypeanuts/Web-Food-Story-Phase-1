'use strict';
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = fs.readFileSync("./data/user.json", "utf-8");
    users = JSON.parse(users);

    users.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", users);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Users", null, {});
  }
};
