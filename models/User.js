const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["client", "partner", "admin"], required: true },
  isVerified: { type: Boolean, default: false },
  otp: String, 
  otpExpires: Date,
  featured: { type: Boolean, default: false }, 
});

module.exports = mongoose.model("User", userSchema);
