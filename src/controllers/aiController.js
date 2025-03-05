const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const cohereApiKey = process.env.COHERE_API_TOKEN; // Cohere API token'ı

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Kullanıcıdan gelen prompt kontrolü
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // API'ye istek gönderme
    const response = await axios.post(
      "https://api.cohere.ai/v2/chat", // Cohere API URL
      {
        model: "command-r", // Kullanılacak model
        messages: [
          {
            role: "user", // Kullanıcı rolü
            content: prompt, // Kullanıcıdan gelen prompt
          },
        ],
        stream: false, // Yanıt akışını kapalı tutuyoruz
      },
      {
        headers: {
          Authorization: `Bearer ${cohereApiKey}`, // API Anahtarı
          "Content-Type": "application/json",
        },
      }
    );

    // Cohere API'den gelen yanıtı işleme
    const generatedText = response.data.message.content[0].text;

    // Başarılı yanıt döndürme
    return res.status(200).json({ generatedText });
  } catch (error) {
    // Hata yönetimi
    console.error("Error generating text:", error.message || error);
    return res.status(500).json({
      error: error.message || "An error occurred while generating the text.",
    });
  }
};

module.exports = { generateText };
