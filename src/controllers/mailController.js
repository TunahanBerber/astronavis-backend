const { Email } = require("../models/emailModel");

// Timeout wrapper
const withTimeout = (promise, timeoutMs = 8000) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("⏱️ Operation timed out")), timeoutMs)
    ),
  ]);

// Email'leri getir
const getEmails = async (req, res) => {
  try {
    console.log("📥 Retrieving all emails...");
    const emails = await withTimeout(Email.find(), 8000);
    res.status(200).json({ success: true, emails });
  } catch (error) {
    console.error("❌ Error retrieving emails:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve emails", error: error.message });
  }
};

// Email formatını doğrulamak için regex
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

    console.log("🔍 Checking for existing email...");
    const existingEmail = await withTimeout(Email.findOne({ email }), 4000);

    if (existingEmail) {
      return res.status(409).json({ success: false, message: "This email is already subscribed" });
    }

    console.log("💾 Saving new email...");
    const newEmail = new Email({ email });
    await withTimeout(newEmail.save(), 4000);

    console.log("✅ Email saved successfully.");
    res.status(201).json({ success: true, message: "Email subscribed successfully" });

  } catch (error) {
    console.error("❌ Error subscribing email:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe email", error: error.message });
  }
};

module.exports = { getEmails, subscribeEmail };
