require("dotenv").config();

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers["x-api-key"]; 

    
    if (req.method === "GET") {
        if (apiKey && apiKey === process.env.API_KEY) {
            next();  ///Doğru ise burada devam edecek middleware mantığı budur zaten.
        } else {
            res.status(403).json({ message: "Unauthorized: Invalid API Key" });
        }
    } else {
        // POST, PUT, DELETE vb. isteklerde API anahtarı kontrolü yapma
        next();  // Diğer istekler için API anahtarı kontrolüne gerek yok
    }
}

module.exports = apiKeyMiddleware;
