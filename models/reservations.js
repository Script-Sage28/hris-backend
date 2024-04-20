"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservations.addScope("guestsInfo", {
        include: ["guests"],
      });
      reservations.belongsTo(models.guests, {
        as: "guests",
        constraints: false,
        foreignKey: "id",
        targetKey: "id",
      });
    }
  }
  reservations.init(
    {
      guestsId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      noOfDays: DataTypes.INTEGER,
      noOfPax: DataTypes.INTEGER,
      arrival: DataTypes.DATE,
      departure: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "reservations",
      freezeTableName: true,
    }
  );
  return reservations;
};
