"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "departments",
      [
        {
          name: "Housekeeping",
          status: 1,
          createdAt: new Date(),
        },
        {
          name: "Food and Beverage",
          status: 1,
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departments", null, {});
  },
};
