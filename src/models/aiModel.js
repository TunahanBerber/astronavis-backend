const mongoose = require("mongoose");

const aiSchema = mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  generatedText: {
    type: String,
    required: true, lu
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model("AiResponse", aiSchema);
