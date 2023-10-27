'use strict';
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let profiles = fs.readFileSync("./data/profiles.json", "utf-8");
    profiles = JSON.parse(profiles);

    profiles.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Profiles", profiles);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Profiles", null, {});
  }
};
