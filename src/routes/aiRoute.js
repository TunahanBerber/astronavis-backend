const express = require("express");
const router = express.Router();
const { generateText } = require("../controllers/aiController");

/**
 * @swagger
 * /api/v1/ai/generate:
 *   post:
 *     summary: Generate text using AI
 *     description: This endpoint generates text using AI based on the input prompt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "Write a short story about a space adventure."
 *     responses:
 *       200:
 *         description: Successfully generated text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 generatedText:
 *                   type: string
 *                   example: "Once upon a time, in a galaxy far, far away..."
 *       400:
 *         description: Invalid input prompt
 */
router.post("/generate", generateText);

module.exports = router;
