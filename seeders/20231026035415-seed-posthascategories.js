'use strict';
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let postHasCategories = fs.readFileSync("./data/postHasCategories.json", "utf-8");
    postHasCategories = JSON.parse(postHasCategories);

    postHasCategories.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("PostHasCategories", postHasCategories);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("PostHasCategories", null, {});
  }
};