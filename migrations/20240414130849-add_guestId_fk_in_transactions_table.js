"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("transactions", {
      fields: ["guestsId"],
      type: "foreign key",
      name: "FK_guestsId_transactions",
      references: {
        table: "guests",
        fields: ["id"],
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "transactions",
      "FK_guestsId_transactions"
    );
  },
};
