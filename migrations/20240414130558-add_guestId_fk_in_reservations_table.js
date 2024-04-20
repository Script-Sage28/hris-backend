"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("reservations", {
      fields: ["guestsId"],
      type: "foreign key",
      name: "FK_guestsId_reservations",
      references: {
        table: "guests",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "reservations",
      "FK_guestsId_reservations"
    );
  },
};
