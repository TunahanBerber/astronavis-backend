const express = require("express");
const router = express.Router();
const apodController = require("../controllers/apodController");

/**
 * @swagger
 * /api/v1/apod:
 *   get:
 *     summary: Get Astronomy Picture of the Day (APOD)
 *     description: Retrieves the Astronomy Picture of the Day (APOD) along with its details like title, explanation, and URL.
 *     responses:
 *       200:
 *         description: Successfully retrieved APOD data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "A Beautiful Galaxy"
 *                 explanation:
 *                   type: string
 *                   example: "This is an explanation of the astronomy picture of the day."
 *                 url:
 *                   type: string
 *                   example: "https://apod.nasa.gov/apod/image/2301/example_image.jpg"
 */
router.get("/", apodController.getApod);

module.exports = router;
