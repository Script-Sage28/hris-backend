"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rooms",
      [
        {
          type: "Presidential",
          rate: 8000.0,
          status: 1,
          minimumCapacity: 8,
          maximumCapacity: 10,
          availableRooms: 13,
          createdAt: new Date(),
        },
        {
          type: "Family Suit",
          rate: 5500.0,
          status: 1,
          minimumCapacity: 8,
          maximumCapacity: 10,
          availableRooms: 15,
          createdAt: new Date(),
        },
        {
          type: "Superior",
          rate: 4100.0,
          status: 1,
          minimumCapacity: 5,
          maximumCapacity: 7,
          availableRooms: 10,
          createdAt: new Date(),
        },
        {
          type: "Deluxe",
          rate: 3500.0,
          status: 1,
          minimumCapacity: 2,
          maximumCapacity: 4,
          availableRooms: 12,
          createdAt: new Date(),
        },
        {
          type: "Standard",
          rate: 2000.0,
          status: 1,
          minimumCapacity: 2,
          maximumCapacity: 3,
          availableRooms: 10,
          createdAt: new Date(),
        },
        {
          type: "Single Room",
          rate: 1200.0,
          status: 1,
          minimumCapacity: 1,
          maximumCapacity: 2,
          availableRooms: 15,
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
