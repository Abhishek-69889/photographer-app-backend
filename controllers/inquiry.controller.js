const Inquiry = require("../models/Inquiry");
const PartnerProfile = require("../models/PartnerProfile");

exports.submitInquiry = async (req, res) => {
  try {
    const { category, date, budget, city, referenceImage } = req.body;

    const inquiry = new Inquiry({
      clientId: req.user.id,
      category,
      date,
      budget,
      city,
      referenceImage,
      status: "new",
    });

    const matchedPartners = await PartnerProfile.find({
      verificationStatus: "verified",
      serviceDetails: { $regex: category, $options: "i" },
    });

    if (matchedPartners.length > 0) {
      inquiry.assignedTo = matchedPartners[0].userId;
    }

    await inquiry.save();

    res.status(201).json({ message: "Inquiry submitted", inquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
