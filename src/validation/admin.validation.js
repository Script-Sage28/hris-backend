const Joi = require("joi");
const { GENDER } = require("../helpers/constants");

const loginValidator = (data) => {
  const model = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  const validate = model.validate(data);
  return validate;
};

const addAdminValidator = (data) => {
  const model = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });

  const validate = model.validate(data);
  return validate;
};

module.exports = { loginValidator, addAdminValidator };
