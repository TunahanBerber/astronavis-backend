const axios = require("axios");

const getMarsRoverPhotos = async (sol, rover) => {
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${process.env.NASA_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Mars Rover API Hatası: ${error.message}`);
  }
};

const getMarsRover = async (req, res) => {
  const sol = req.query.sol || 1000;
  const rover = req.query.rover || 'curiosity';

  try {
    const marsRoverData = await getMarsRoverPhotos(sol, rover);
    res.status(200).json(marsRoverData);
  } catch (error) {
    console.error("Mars Rover API Hatası:", error.message);
    res.status(500).json({
      error: "Mars Rover fotoğrafları alınamadı.",
      details: error.message,
    });
  }
};

module.exports = { getMarsRover };
