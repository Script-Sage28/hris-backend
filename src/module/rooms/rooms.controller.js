const { STATUS_CODES } = require("../../helpers/constants");
const {
  addReservationValidator,
  updateReservationValidator,
} = require("../../validation/reservations.validation");
const {
  addRoomValidator,
  updateRoomValidator,
} = require("../../validation/rooms.validation");
const RoomsServices = require("./rooms.services");

class RoomsController {
  constructor() {
    this.roomsServices = new RoomsServices();
    this.allRooms = this.allRooms.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.updateRoom = this.updateRoom.bind(this);
  }

  async allRooms(request, response) {
    try {
      const data = request.query;
      return response.send({
        data: await this.roomsServices.getAllRooms(data),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async addRoom(request, response) {
    try {
      const data = request.body;
      const { error } = addRoomValidator(data);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.roomsServices.addRoom(data),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async updateRoom(request, response) {
    try {
      const id = request?.params?.id;
      const data = request.body;
      const sanitizedData = { id, ...data };
      const { error } = updateRoomValidator(sanitizedData);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.roomsServices.updateRoom(sanitizedData),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = RoomsController;
