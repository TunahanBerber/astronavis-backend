const express = require("express");
const router = express.Router();
const { getEmails, subscribeEmail } = require("../controllers/mailController");

router.get("/", getEmails); 
router.post("/", subscribeEmail); 

module.exports = router;
