require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Express uygulamasını başlat
const app = express();

// CORS yapılandırması
const allowedOrigins = [
  "https://astronavis.space",
  "http://localhost:4200",
  "https://test-astro-navis.vercel.app/",
];

app.use(express.json()); // JSON verilerini işlemek için
app.use(morgan("tiny")); // HTTP logları için

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ Blocked by CORS:", origin);
        callback(new Error("CORS policy blocked this request"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB bağlantısı
const connectionString = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionString, {
    serverSelectionTimeoutMS: 10000, // 10 saniyede bağlanamazsa hata fırlat
  })
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
    process.exit(1); // Hata varsa sunucuyu durdur
  });

// Rotalar
const aiRoutes = require("./src/routes/aiRoute");

const api = process.env.API_URL || "/api/v1";
app.use(`${api}/ai`, aiRoutes); // AI metin üretme endpoint'i

// Ana Sayfa Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the AstroNavis Backend!");
});

// Sunucuyu Başlat
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
