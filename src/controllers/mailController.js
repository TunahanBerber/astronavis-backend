const { Email } = require("../models/emailModel");

// Email'leri getir
const getEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.status(200).json({ success: true, emails });
  } catch (error) {
    console.error("❌ Error retrieving emails:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve emails", error: error.message });
  }
};

// Email formatını doğrulamak için regex
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Yeni email aboneliği
const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Email'in zaten kayıtlı olup olmadığını kontrol et
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: "This email is already subscribed" });
    }

    // Yeni email'i kaydet
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ success: true, message: "Email subscribed successfully" });
  } catch (error) {
    console.error("❌ Error subscribing email:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe email", error: error.message });
  }
};

module.exports = { getEmails, subscribeEmail };
