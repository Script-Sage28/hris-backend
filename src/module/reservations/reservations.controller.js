const { STATUS_CODES } = require("../../helpers/constants");
const {
  addReservationValidator,
  updateReservationValidator,
} = require("../../validation/reservations.validation");
const ReservationsServices = require("./reservations.services");

class ReservationController {
  constructor() {
    this.reservationsServices = new ReservationsServices();
    this.allReservations = this.allReservations.bind(this);
    this.addReservation = this.addReservation.bind(this);
    this.updateReservation = this.updateReservation.bind(this);
  }

  async allReservations(request, response) {
    try {
      return response.send({
        data: await this.reservationsServices.allReservations(),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async addReservation(request, response) {
    try {
      const data = request.body;
      const { error } = addReservationValidator(data);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.reservationsServices.addReservation(data),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async updateReservation(request, response) {
    try {
      const id = request?.params?.id;
      const data = request.body;
      const sanitizedData = { id, ...data };
      const { error } = updateReservationValidator(sanitizedData);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.reservationsServices.updateReservation(sanitizedData),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReservationController;
