const User = require("../models/User");
const PartnerProfile = require("../models/PartnerProfile");
const Inquiry = require("../models/Inquiry");
const Review = require("../models/Review");
const Category = require("../models/Category");
const Location = require("../models/Location");


exports.getStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: "client" });
    const totalPartners = await User.countDocuments({ role: "partner" });
    const pendingPartners = await PartnerProfile.countDocuments({ verificationStatus: "pending" });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({ totalClients, totalPartners, pendingPartners, totalInquiries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPendingPartners = async (req, res) => {
  try {
    const pending = await PartnerProfile.find({ verificationStatus: "pending" }).populate("userId", "name email");
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { status, comment } = req.body;
    if (!["verified", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const profile = await PartnerProfile.findOne({ userId: partnerId });
    if (!profile) return res.status(404).json({ message: "Partner profile not found" });

    profile.verificationStatus = status;
    profile.comment = comment || "";
    await profile.save();

    
    await User.findByIdAndUpdate(partnerId, { isVerified: status === "verified" });

    res.json({ message: `Partner ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.promotePartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const user = await User.findById(partnerId);
    if (!user || user.role !== "partner") return res.status(404).json({ message: "Partner not found" });

    user.featured = true;
    await user.save();

    res.json({ message: "Partner promoted as featured" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
