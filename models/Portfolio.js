const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imageUrl: String,
  description: String,
  index: Number,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
