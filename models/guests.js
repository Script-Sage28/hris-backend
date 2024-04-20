"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class guests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  guests.init(
    {
      firstName: DataTypes.STRING,
      middleInitial: DataTypes.STRING,
      lastName: DataTypes.STRING,
      houseNo: DataTypes.STRING,
      street: DataTypes.STRING,
      barangay: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      contactNo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "guests",
      freezeTableName: true,
    }
  );
  return guests;
};
