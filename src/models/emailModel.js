const mongoose = require('mongoose');

// Email şeması
const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Her emailin yalnızca bir kez kaydedilmesini sağla
  }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = { Email };
