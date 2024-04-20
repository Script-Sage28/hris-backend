const Joi = require("joi");

const addGuestsValidator = (data) => {
  const model = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    middleInitial: Joi.allow("", null),
    lastName: Joi.string().required().label("Last Name"),
    houseNo: Joi.string().required().label("House No"),
    street: Joi.string().required().label("Street"),
    barangay: Joi.string().required().label("Barangay"),
    city: Joi.string().required().label("City"),
    province: Joi.string().required().label("Province"),
    contactNo: Joi.string().required().label("Contact No."),
  });

  const validate = model.validate(data);
  return validate;
};

const updateGuestsValidator = (data) => {
  const model = Joi.object({
    id: Joi.number().required().label("Guests ID"),
    firstName: Joi.string().required().label("First Name"),
    middleInitial: Joi.allow("", null),
    lastName: Joi.string().required().label("Last Name"),
    houseNo: Joi.string().required().label("House No"),
    street: Joi.string().required().label("Street"),
    barangay: Joi.string().required().label("Barangay"),
    city: Joi.string().required().label("City"),
    province: Joi.string().required().label("Province"),
    contactNo: Joi.string().required().label("Contact No."),
  });

  const validate = model.validate(data);
  return validate;
};

module.exports = { addGuestsValidator, updateGuestsValidator };
