const PartnerProfile = require("../models/PartnerProfile");
const Inquiry = require("../models/Inquiry");

exports.createProfile = async (req, res) => {
  try {
    const { serviceDetails, aadharNumber, portfolio } = req.body;
    const existingProfile = await PartnerProfile.findOne({ userId: req.user.id });
    if (existingProfile)
      return res.status(400).json({ message: "Profile already exists" });

    const profile = new PartnerProfile({
      userId: req.user.id,
      serviceDetails,
      aadharNumber,
      portfolio,
    });
    await profile.save();
    res.json({ message: "Profile submitted for verification" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Inquiry.find({ assignedTo: req.user.id });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
