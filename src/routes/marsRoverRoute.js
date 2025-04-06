const express = require('express');
const router = express.Router();
const marsRoverController = require("../controllers/marsRoverController");

// Mars Rover API örneği
/**
 * @swagger
 * /api/v1/mars-rover:
 *   get:
 *     summary: Mars Rover information
 *     description: Get information about the Mars Rover.
 *     responses:
 *       200:
 *         description: Successfully retrieved Mars Rover data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rover:
 *                   type: string
 *                   example: "Curiosity"
 *                 status:
 *                   type: string
 *                   example: "Active"
 */
router.get("/", marsRoverController.getMarsRover);

module.exports = router;
