const express = require("express");
const RoomsController = require("../module/rooms/rooms.controller");

const router = express.Router();

const roomsController = new RoomsController();
router.get("/all", roomsController.allRooms);
router.post("/add", roomsController.addRoom);
router.put("/update/:id", roomsController.updateRoom);

module.exports = router;
