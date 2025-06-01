const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  city: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Location", locationSchema);
