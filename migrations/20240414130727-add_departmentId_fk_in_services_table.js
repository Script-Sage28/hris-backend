"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("services", {
      fields: ["departmentId"],
      type: "foreign key",
      name: "FK_departmentId_services",
      references: {
        table: "departments",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "services",
      "FK_departmentId_services"
    );
  },
};
