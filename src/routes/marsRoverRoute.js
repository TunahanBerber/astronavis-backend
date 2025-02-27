const express = require("express");
const router = express.Router();
const marsRoverController = require("../controllers/marsRoverController");

router.get("/", marsRoverController.getMarsRover);

module.exports = router;
