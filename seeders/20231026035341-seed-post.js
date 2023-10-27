'use strict';
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let posts = fs.readFileSync("./data/posts.json", "utf-8");
    posts = JSON.parse(posts);

    posts.forEach((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Posts", posts);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Posts", null, {});
  }
};
