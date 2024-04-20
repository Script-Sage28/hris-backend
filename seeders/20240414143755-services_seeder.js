"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "services",
      [
        {
          name: "Additional Blanket",
          departmentId: 1,
          createdAt: new Date(),
        },
        {
          name: "Additional Foam",
          departmentId: 1,
          createdAt: new Date(),
        },
        {
          name: "Additional Pillows",
          departmentId: 1,
          createdAt: new Date(),
        },
        {
          name: "Additional Juice",
          departmentId: 2,
          createdAt: new Date(),
        },
        {
          name: "Additional Food",
          departmentId: 2,
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("services", null, {});
  },
};
