"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("reservations", "roomId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("reservations", {
      fields: ["roomId"],
      type: "foreign key",
      name: "FK_roomId_reservations",
      references: {
        table: "rooms",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("roomId");
    await queryInterface.removeConstraint(
      "reservations",
      "FK_roomId_reservations"
    );
  },
};
