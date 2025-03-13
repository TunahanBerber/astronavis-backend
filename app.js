require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// CORS Yapılandırması
const allowedOrigins = [
  "https://astronavis.space",
  "http://localhost:4200",
  "https://test-astro-navis.vercel.app/",
];

app.use(express.json());
app.use(morgan("tiny"));

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

// MongoDB Bağlantısı
const connectionString = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionString, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
  });

// Rotalar
const aiRoutes = require("./src/routes/aiRoute");
const marsRoverRoutes = require("./src/routes/marsRoverRoute");
const apodRoutes = require("./src/routes/apodRoute");
const emailRoute = require("./src/routes/emailRoute");

const api = process.env.API_URL || "/api/v1";

// Rotaları tanımla
app.use(`${api}/ai`, aiRoutes); 
app.use(`${api}/mars-rover`, marsRoverRoutes); 
app.use(`${api}/apod`, apodRoutes);
app.use(`${api}/emails`, emailRoute);

// Ana Sayfa Route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the AstroNavis Backend!");
});

// Sunucuyu Başlat
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
