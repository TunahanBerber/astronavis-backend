const mongoose = require("mongoose");

const apodSchema = mongoose.Schema({
    title: String,
    explanation: String,
    url: String,
    date: String,
});

module.exports = mongoose.model("APOD", apodSchema);