const Portfolio = require("../models/Portfolio");

exports.addPortfolioItem = async (req, res) => {
  try {
    if (req.user.role !== "partner")
      return res.status(403).json({ message: "Only partners can add portfolio" });

    const { imageUrl, description, orderIndex } = req.body;

    const entry = new Portfolio({
      partnerId: req.user.id,
      imageUrl,
      description,
      orderIndex,
    });

    await entry.save();
    res.status(201).json({ message: "Portfolio entry added", entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPortfolioItems = async (req, res) => {
  try {
    if (req.user.role !== "partner")
      return res.status(403).json({ message: "Only partners can get portfolio" });

    const portfolio = await Portfolio.find({ partnerId: req.user.id }).sort("orderIndex");
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, description, orderIndex } = req.body;

    const entry = await Portfolio.findById(id);
    if (!entry) return res.status(404).json({ message: "Portfolio entry not found" });
    if (!entry.partnerId.equals(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    if (imageUrl !== undefined) entry.imageUrl = imageUrl;
    if (description !== undefined) entry.description = description;
    if (orderIndex !== undefined) entry.orderIndex = orderIndex;

    await entry.save();
    res.json({ message: "Portfolio updated", entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Portfolio.findById(id);
    if (!entry) return res.status(404).json({ message: "Portfolio entry not found" });
    if (!entry.partnerId.equals(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    await entry.remove();
    res.json({ message: "Portfolio entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reorderPortfolio = async (req, res) => {
  try {
    // Accept array of { id, orderIndex } to update multiple portfolio items
    const updates = req.body; // [{ id, orderIndex }]

    for (const { id, orderIndex } of updates) {
      const entry = await Portfolio.findById(id);
      if (entry && entry.partnerId.equals(req.user.id)) {
        entry.orderIndex = orderIndex;
        await entry.save();
      }
    }

    res.json({ message: "Portfolio reordered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
