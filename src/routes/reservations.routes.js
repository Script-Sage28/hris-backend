const express = require("express");
const ReservationController = require("../module/reservations/reservations.controller");

const router = express.Router();

const reservationController = new ReservationController();
router.get("/all", reservationController.allReservations);
router.post("/add", reservationController.addReservation);
router.put("/update/:id", reservationController.updateReservation);

module.exports = router;
