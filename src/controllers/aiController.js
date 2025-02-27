const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const cohereApiKey = process.env.COHERE_API_TOKEN; // Cohere API token'ı

const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // API'ye istek gönderme
    const response = await axios.post(
      "https://api.cohere.ai/v2/chat", // Cohere API URL
      {
        model: "command-r", // Kullandığınız model
        messages: [
          {
            role: "user", // Kullanıcı rolü
            content: prompt, // Kullanıcıdan gelen prompt
          },
        ],
        stream: false, // Streaming özelliğini kapatıyoruz
      },
      {
        headers: {
          Authorization: `Bearer ${cohereApiKey}`, // API anahtarını başlıkta ekle
          "Content-Type": "application/json",
        },
      }
    );

    // Cohere'den gelen yanıtı döndürme
    const generatedText = response.data.message.content[0].text;

    return res.status(200).json({ generatedText: generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    return res.status(500).json({ error: "Error generating text" });
  }
};

module.exports = { generateText };
