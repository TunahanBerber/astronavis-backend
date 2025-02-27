require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const apiKeyMiddleware = require("./src/middleware/apiKeyMiddleware");

const app = express();
const allowedOrigins = [
  "https://astronavis.space",
  "http://localhost:4200",
  "https://test-astro-navis.vercel.app/",
];

const api = process.env.API_URL || "/api/v1";

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin); // Test için log atalım
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("CORS policy blocked this request"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// MongoDB Connection
const connectionString = process.env.CONNECTION_STRING;
mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const apodRoute = require("./src/routes/apodRoute");
const marsRoverRoute = require("./src/routes/marsRoverRoute");
const emailRoute = require("./src/routes/emailRoute");
const aiRoutes = require("./src/routes/aiRoute"); // AI Route'larını import ediyoruz

app.use(`${api}/apod`, apodRoute);
app.use(`${api}/mars-rover`, marsRoverRoute);
app.use(`${api}/email`, apiKeyMiddleware, emailRoute); // API KEY MIDDLEWARE KORUMASI
app.use(`${api}/ai`, aiRoutes); // AI ile ilgili route'ları da ekliyoruz

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the AstroNavis Backend!");
});

// Start Server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
