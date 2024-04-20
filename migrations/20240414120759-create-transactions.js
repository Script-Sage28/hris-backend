'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guestsId: {
        type: Sequelize.INTEGER
      },
      modeOfPayment: {
        type: Sequelize.STRING
      },
      amountToPay: {
        type: Sequelize.FLOAT
      },
      amountReceived: {
        type: Sequelize.FLOAT
      },
      discount: {
        type: Sequelize.INTEGER
      },
      chargesFromDepartments: {
        type: Sequelize.STRING
      },
      serviceCharge: {
        type: Sequelize.FLOAT
      },
      balance: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      remarks: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};