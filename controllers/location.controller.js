const Location = require("../models/Location");

exports.createLocation = async (req, res) => {
  try {
    const { city } = req.body;
    const existing = await Location.findOne({ city });
    if (existing) return res.status(400).json({ message: "City exists" });

    const location = new Location({ city });
    await location.save();
    res.status(201).json({ message: "Location created", location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const location = await Location.findById(id);
    if (!location) return res.status(404).json({ message: "Location not found" });

    location.city = city || location.city;
    await location.save();
    res.json({ message: "Location updated", location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await Location.findByIdAndDelete(id);
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
