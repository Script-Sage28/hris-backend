"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transactions.init(
    {
      guestsId: DataTypes.INTEGER,
      modeOfPayment: DataTypes.STRING,
      amountToPay: DataTypes.FLOAT,
      amountReceived: DataTypes.FLOAT,
      discount: DataTypes.INTEGER,
      chargesFromDepartments: DataTypes.STRING,
      serviceCharge: DataTypes.FLOAT,
      balance: DataTypes.FLOAT,
      status: DataTypes.STRING,
      remarks: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transactions",
      freezeTableName: true,
    }
  );
  return transactions;
};
