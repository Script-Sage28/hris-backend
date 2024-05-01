const { Sequelize, reservations, rooms, guests } = require("../../../models");
const sequelizeOpt = Sequelize.Op;
class RoomsServices {
  async getAllRooms(data) {
    let whereClause = {};
    if(data?.noOfPax){
      whereClause = {
        [Op.or]:[
          {
            minimumCapacity:{
              [Op.gte]: data.noOfPax,
              [Op.not]: null
            }
          },
          {
            maximumCapacity:{
              [Op.lte]: data.noOfPax,
              [Op.not]: null
            }
          }
        ]
      }
    }
    try {
      const allRooms = await rooms.scope(["guestsInfo"]).findAll({
        where: whereClause,
        include: [{
          model: guests,
          as: 'guests',
          attributes: ['id', 'firstName', 'middleInitial', 'lastName', 'houseNo', 'street', 'barangay', 'city', 'province', 'contactNo', 'createdAt', 'updatedAt'],
        }],
      });
      console.log(allRooms)
      return allRooms;
    } catch (error) {
      throw Error(error);
    }
  }

  async addRoom() {
    try {
      const checkIfGuestsIsExist = await guests.findOne({
        where: {
          id: data?.guestsId,
        },
      });

      if (!checkIfGuestsIsExist) {
        return "Guests not exists";
      }
      const newRoom = await rooms.create({
        guestsId: data?.guestsId,
        type: data?.type,
        rate: data?.rate,
        minimumCapacity: data?.minimumCapacity,
        maximumCapacity: data?.maximumCapacity,
        totalNoOfAvailableRooms: data?.totalNoOfAvailableRooms,
        availableRooms: data?.availableRooms,
        status: 1,
        createdAt: new Date(),
      });
      let body = newRoom.toJSON();
      body.guests = await newRoom.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }

  async updateRoom(data) {
    try {
      const existingRoom = await rooms.findOne({
        where: {
          id: data?.id,
        },
      });
      if (isNil(existingRoom)) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: "Room is not exists" });
      }
      existingRoom.set({
        guestsId: data?.guestsId,
        type: data?.type,
        rate: data?.rate,
        minimumCapacity: data?.minimumCapacity,
        maximumCapacity: data?.maximumCapacity,
        totalNoOfAvailableRooms: data?.totaNloOfAvailableRooms,
        status: data?.status,
        updatedAt: new Date(),
      });
      await existingRoom.save();
      let body = existingRoom.toJSON();
      body.guests = await existingRoom.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }

  async getReservedRoom(data) {
    try {
      const existingRoom = await rooms.findOne({
        where: {
          id: data?.id,
        },
      });

      if (isNil(existingRoom)) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: "Room is not exists" });
      }

      existingRoom.set({
        totalNoOfAvailableRooms:
          existingRoom?.availableRooms !== 0
            ? existingRoom?.availableRooms - 1
            : 0,
        updatedAt: new Date(),
      });
      await existingRoom.save();
      let body = existingRoom.toJSON();
      body.guests = await existingRoom.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }

  async addAvailableRoom(data) {
    try {
      const existingRoom = await rooms.findOne({
        where: {
          id: data?.id,
        },
      });

      if (isNil(existingRoom)) {
        return res
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: "Room is not exists" });
      }
      if (
        existingRoom?.totalNoOfAvailableRooms + 1 >
        existingRoom?.availableRooms
      ) {
        return res.status(STATUS_CODES.SERVER_ERROR).json({
          message: "Should not exceeds in default number of available rooms.",
        });
      }

      existingRoom.set({
        totalNoOfAvailableRooms:
          existingRoom?.totalNoOfAvailableRooms !== 0 &&
          data?.availableRooms <= existingRoom?.totalNoOfAvailableRooms
            ? existingRoom?.totalNoOfAvailableRooms + 1
            : 0,
        updatedAt: new Date(),
      });
      await existingRoom.save();
      let body = existingRoom.toJSON();
      body.guests = await existingRoom.getGuests();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
}

module.exports = RoomsServices;
