const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category exists" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    await category.save();
    res.json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
