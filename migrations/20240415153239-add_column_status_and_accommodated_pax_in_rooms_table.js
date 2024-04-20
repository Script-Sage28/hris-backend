"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("rooms", "status", {
      type: Sequelize.TINYINT,
      allowNull: false,
      default: 1,
    });
    await queryInterface.addColumn("rooms", "minimumCapacity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });
    await queryInterface.addColumn("rooms", "maximumCapacity", {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });
    await queryInterface.addColumn("rooms", "totalNoOfAvailableRooms", {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });
    await queryInterface.addColumn("rooms", "guestsId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 0,
    });
    await queryInterface.addConstraint("rooms", {
      fields: ["guestsId"],
      type: "foreign key",
      name: "FK_guestsId_rooms",
      references: {
        table: "guests",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("rooms", "status");
    await queryInterface.removeColumn("rooms", "minimumCapacity");
    await queryInterface.removeColumn("rooms", "maximumCapacity");
    await queryInterface.removeColumn("rooms", "totalNoOfAvailableRooms");
    await queryInterface.removeColumn("rooms", "guestsId");
    await queryInterface.removeConstraint("rooms", "FK_guestsId_rooms");
  },
};
