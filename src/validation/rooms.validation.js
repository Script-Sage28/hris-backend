const Joi = require("joi");

const addRoomValidator = (data) => {
  const model = Joi.object({
    guestsId: Joi.number().required().label("Guests ID"),
    type: Joi.string().required().label("Type"),
    rate: Joi.number().positive().required().label("Rate"),
    minimumCapacity: Joi.number()
      .positive()
      .required()
      .label("Minimum Capacity"),
    maximumCapacity: Joi.number()
      .positive()
      .required()
      .label("Minimum Capacity"),
    availableRooms: Joi.number()
      .positive()
      .required()
      .label("Default available rooms"),
    status: Joi.allow("", null),
  });

  const validate = model.validate(data);
  return validate;
};

const updateRoomValidator = (data) => {
  const model = Joi.object({
    id: Joi.number().required().label("Reservation ID"),
    guestsId: Joi.number().required().label("Guests ID"),
    type: Joi.string().required().label("Type"),
    rate: Joi.number().positive().required().label("Rate"),
    minimumCapacity: Joi.number()
      .positive()
      .required()
      .label("Minimum Capacity"),
    maximumCapacity: Joi.number()
      .positive()
      .required()
      .label("Minimum Capacity"),
    availableRooms: Joi.number()
      .positive()
      .required()
      .label("Default available rooms"),
    status: Joi.allow("", null),
  });

  const validate = model.validate(data);
  return validate;
};

module.exports = { addRoomValidator, updateRoomValidator };
