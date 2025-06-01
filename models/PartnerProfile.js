const mongoose = require("mongoose");

const partnerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  serviceDetails: String,
  aadharNumber: String,
  portfolio: [String],
  verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
  comment: String,
});

module.exports = mongoose.model("PartnerProfile", partnerProfileSchema);