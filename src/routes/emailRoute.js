const express = require("express");
const router = express.Router();
const {subscribeEmail } = require("../controllers/mailController");

/**
 * @swagger
 * /api/v1/emails:
 *   post:
 *     summary: Subscribe an email
 *     description: Subscribes a new email to the mailing list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newsubscriber@example.com"
 *     responses:
 *       201:
 *         description: Successfully subscribed the email
 *       400:
 *         description: Invalid email format
 */
router.post("/", subscribeEmail); 

module.exports = router;
