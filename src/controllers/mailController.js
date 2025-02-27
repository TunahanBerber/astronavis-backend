const { Email } = require('../models/emailModel'); // Email modelini içe aktar

// Email'leri al
const getEmails = async (req, res) => {
  try {
    const emails = await Email.find(); // Email koleksiyonundaki tüm verileri al
    res.status(200).json(emails); // JSON olarak geri döndür
  } catch (error) {
    console.error('Error retrieving emails:', error.message);
    res.status(500).json({ error: 'Failed to retrieve emails', details: error.message });
  }
};

// Yeni email abone et
const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' }); // Email girilmemişse hata mesajı
  }

  try {
    // Email zaten var mı kontrol et
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'This email is already subscribed' }); // Eğer email mevcutsa, hata gönder
    }

    // Yeni emaili kaydet
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: 'Email subscribed successfully' }); // Başarı mesajı
  } catch (error) {
    console.error('Error subscribing email:', error.message);
    res.status(500).json({ error: 'Failed to subscribe email', details: error.message });
  }
};

module.exports = { getEmails, subscribeEmail };
