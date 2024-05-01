const { STATUS_CODES } = require("../../../helpers/constants");
const {
  loginValidator,
  addAdminValidator,
} = require("../../validation/admin.validation");
const AdminServices = require("./admins.services");

class AdminController {
  constructor() {
    this.adminServices = new AdminServices();
    this.login = this.login.bind(this);
    this.addAdmin = this.addAdmin.bind(this);
  }
  async login(request, response) {
    try {
      const data = request.body;
      console.log(data)
      const { error } = loginValidator(data);
      if (error)
        return response
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: error.message });
      return response.send({
        data:await this.adminServices.login(data),
      });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  async addAdmin(request, response) {
    try {
      const data = request.body;
      const { error } = addAdminValidator(data);

      if (error)
        return response
          .status(STATUS_CODES.SERVER_ERROR)
          .json({ message: error.message });

      return response.send({
        data: await this.adminServices.addAdmin(data),
      });
    } catch (error) {
      return response
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

module.exports = AdminController;
