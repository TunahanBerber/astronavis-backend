const mongoose = require("mongoose");

const marsRoverSchema = mongoose.Schema({
    id: Number,
    sol: Number,
    camera: {
        id: Number,
        name: String,
        rover_id: Number,
    },
    img_src: String,
    earth_date: String,
});

module.exports = mongoose.model("MarsRover", marsRoverSchema);
