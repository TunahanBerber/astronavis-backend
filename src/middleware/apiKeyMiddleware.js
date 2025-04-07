require("dotenv").config();

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = process.env.API_KEY;

  if (!validApiKey) {
    console.error("❌ API_KEY is not set in environment variables.");
    return res
      .status(500)
      .json({ message: "Internal Server Error: API Key not configured" });
  }

  if (apiKey && apiKey === validApiKey) {
    return next();
  } else {
    return res.status(403).json({ message: "Unauthorized: Invalid API Key" });
  }
}

module.exports = apiKeyMiddleware;