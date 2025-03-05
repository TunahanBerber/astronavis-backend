const express = require("express");
const router = express.Router();
const { generateText } = require("../controllers/aiController"); 

// AI metin üretme route'u
router.post("/generate", generateText);

module.exports = router;
