const { isNil } = require("lodash");
const { Sequelize, guests } = require("../../../models");
const sequelizeOpt = Sequelize.Op;
class GuestsServices {
  async fetchGuests() {
    try {
      const allGuests = await guests.findAll({});
      return allGuests;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
  async addGuests(data) {
    try {
      const guestsInfo = await guests.create({
        firstName: data?.firstName,
        middleInitial: data?.middleInitial,
        lastName: data?.lastName,
        houseNo: data?.houseNo,
        street: data?.street,
        barangay: data?.barangay,
        city: data?.city,
        province: data?.province,
        contactNo: data?.contactNo,
        createdAt: new Date(),
      });
      let body = guestsInfo.toJSON();
      return body;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateGuestInfo(data) {
    try {
      const guestsInfo = await guests.findOne({
        where: {
          id: data?.id,
        },
      });
      if (isNil(guestsInfo)) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: "Guests is not exists" });
      }
      guestsInfo.set({
        firstName: data?.firstName,
        middleInitial: data?.middleInitial,
        lastName: data?.lastName,
        houseNo: data?.houseNo,
        street: data?.street,
        barangay: data?.barangay,
        city: data?.city,
        province: data?.province,
        contactNo: data?.contactNo,
        updatedAt: new Date(),
      });

      await guestsInfo.save();
      let body = guestsInfo.toJSON();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
}

module.exports = GuestsServices;
