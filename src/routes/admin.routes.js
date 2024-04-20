const express = require("express");
const AdminController = require("../module/admins/admins.controller");
const router = express.Router();

const adminController = new AdminController();
router.post("/login", adminController.login);
router.post("/add", adminController.addAdmin);

module.exports = router;
