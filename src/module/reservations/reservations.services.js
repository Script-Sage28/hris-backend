const { Sequelize, reservations, guests } = require("../../../models");
const sequelizeOpt = Sequelize.Op;
class ReservationsServices {
  async allReservations() {
    try {
      const allReservations = await reservations
        .scope(["guestsInfo"])
        .findAll({});
      return allReservations;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
  async addReservation(data) {
    try {
      const checkIfGuestsIsExist = await guests.findOne({
        where: {
          id: data?.guestsId,
        },
      });

      if (!checkIfGuestsIsExist) {
        return "Guests not exists";
      }
      const reservation = await reservations.create({
        guestsId: data?.guestsId,
        roomId: data?.roomId,
        noOfDays: data?.noOfDays,
        noOfPax: data?.noOfPax,
        arrival: data?.arrival,
        departure: data?.departure,
        status: "Check-In",
        createdAt: new Date(),
      });
      let body = reservation.toJSON();
      body.guests = await reservation.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }

  async updateReservation(data) {
    try {
      const existingReservation = await reservations.findOne({
        where: {
          id: data?.id,
        },
      });
      if (isNil(existingReservation)) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: "Reservation is not exists" });
      }
      existingReservation.set({
        guestsId: data?.guestsId,
        roomId: data?.roomId,
        noOfDays: data?.noOfDays,
        noOfPax: data?.noOfPax,
        arrival: data?.arrival,
        departure: data?.departure,
        status: data?.status,
        updatedAt: new Date(),
      });
      await existingReservation.save();
      let body = existingReservation.toJSON();
      body.guests = await existingReservation.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
}

module.exports = ReservationsServices;
