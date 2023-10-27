'use strict';
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let categories = fs.readFileSync("./data/category.json", "utf-8");
    categories = JSON.parse(categories);

    categories.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Categories", categories);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Categories", null, {});
  }
};