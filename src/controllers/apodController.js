const axios = require("axios");

const getApodData = async (date) => {
  const apiUrl = date
    ? `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${date}`
    : `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error(`APOD API Hatası: ${error.message}`);
  }
};

const getApod = async (req, res) => {
  const date = req.query.date;
  try {
    const apodData = await getApodData(date);
    res.status(200).json(apodData);
  } catch (error) {
    console.error("APOD API Hatası:", error.message);
    res.status(500).json({
      error: "APOD verisi alınamadı.",
      details: error.message,
    });
  }
};

module.exports = { getApod };
