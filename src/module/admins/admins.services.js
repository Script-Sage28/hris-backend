const { Sequelize, admins } = require("../../../models");
const bcrypt = require("bcrypt");
const sequelizeOpt = Sequelize.Op;

class AdminServices {
  async login(data) {
    try {
      const admin = await admins.findOne({
        where: {
          [sequelizeOpt.and]: [
            {
              username: {
                [sequelizeOpt.like]: "%" + data.username + "%",
              },
            },
          ],
        },
      });

      if (admin) {
        if (!(await bcrypt.compare(data.password, admin.password))) {
          return "Invalid username or password";
        }
      }
      return admin;
    } catch (error) {
      throw Error(error);
    }
  }

  async addAdmin(data) {
    try {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hashSync(data.password, salt);
      const admin = await admins.create({
        username: data.username,
        password: data.password,
      });
      let body = admin.toJSON();
      return body;
    } catch (error) {
      throw Error(error?.parent?.sqlMessage);
    }
  }
}

module.exports = AdminServices;
