'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Profiles", "gender", Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Profiles", "gender");
  }
};
