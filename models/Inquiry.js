const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  date: Date,
  budget: Number,
  city: String,
  referenceImage: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["new", "responded", "booked", "closed"], default: "new" },
});

module.exports = mongoose.model("Inquiry", inquirySchema);
