"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      rooms.addScope("guestsInfo", {
        include: ["guests"],
      });
      rooms.belongsTo(models.guests, {
        as: "guests",
        constraints: false,
        foreignKey: "id",
        targetKey: "id",
      });
    }
  }
  rooms.init(
    {
      type: DataTypes.STRING,
      rate: DataTypes.FLOAT,
      guestsId: DataTypes.INTEGER,
      status: DataTypes.TINYINT,
      minimumCapacity: DataTypes.INTEGER,
      maximumCapacity: DataTypes.INTEGER,
      availableRooms: DataTypes.INTEGER,
      totalNoOfAvailableRooms: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "rooms",
      freezeTableName: true,
    }
  );
  return rooms;
};
