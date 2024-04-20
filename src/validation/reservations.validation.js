const Joi = require("joi");

const addReservationValidator = (data) => {
  const model = Joi.object({
    guestsId: Joi.number().required().label("Guests ID"),
    roomId: Joi.number().required().label("Room ID"),
    noOfDays: Joi.number().required().label("No. of Days"),
    noOfPax: Joi.number().required().label("No. of Pax"),
    arrival: Joi.date().iso().required().label("Arrival"),
    departure: Joi.date().iso().required().label("Departure"),
  });

  const validate = model.validate(data);
  return validate;
};

const updateReservationValidator = (data) => {
  const model = Joi.object({
    id: Joi.number().required().label("Reservation ID"),
    guestsId: Joi.number().required().label("Guests ID"),
    roomId: Joi.number().required().label("Room ID"),
    noOfDays: Joi.number().required().label("No. of Days"),
    noOfPax: Joi.number().required().label("No. of Pax"),
    arrival: Joi.date().iso().required().label("Arrival"),
    departure: Joi.date().iso().required().label("Departure"),
  });

  const validate = model.validate(data);
  return validate;
};

module.exports = { addReservationValidator, updateReservationValidator };
