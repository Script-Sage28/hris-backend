const express = require("express");
const GuestsController = require("../module/guests/guests.controller");

const router = express.Router();

const guestsController = new GuestsController();
router.get("/all", guestsController.allGuests);
router.post("/add", guestsController.addGuests);
router.put("/update/:id", guestsController.updateGuests);

module.exports = router;
