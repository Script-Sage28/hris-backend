const { STATUS_CODES } = require("../../helpers/constants");
const {
  addGuestsValidator,
  updateGuestsValidator,
} = require("../../validation/guests.validation");
const GuestsServices = require("./guests.services");

class GuestsController {
  constructor() {
    this.guestsServices = new GuestsServices();
    this.allGuests = this.allGuests.bind(this);
    this.addGuests = this.addGuests.bind(this);
    this.updateGuests = this.updateGuests.bind(this);
  }

  async allGuests(request, response) {
    try {
      return response.send({
        data: await this.guestsServices.fetchGuests(),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async addGuests(request, response) {
    try {
      const data = request.body;
      const { error } = addGuestsValidator(data);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.guestsServices.addGuests(data),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async updateGuests(request, response) {
    try {
      const id = request?.params?.id;
      const data = request.body;
      const sanitizedData = { id, ...data };
      const { error } = updateGuestsValidator(sanitizedData);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.guestsServices.updateGuestInfo(sanitizedData),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
}

module.exports = GuestsController;
