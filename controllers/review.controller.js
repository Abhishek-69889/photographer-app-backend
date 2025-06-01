const Review = require("../models/Review");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId", "name").populate("partnerId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
