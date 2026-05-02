const Product = require("../models/Product");
const Category = require("../models/Category");

async function listCategories(req, res, next) {
  try {
    const [fromProducts, stored] = await Promise.all([
      Product.distinct("category"),
      Category.find().select("name").lean(),
    ]);
    const fromStored = stored.map((c) => c.name);
    const merged = [...new Set([...fromStored, ...fromProducts])].filter(
      (cat) => cat && String(cat).trim(),
    );
    merged.sort((a, b) => a.localeCompare(b));
    res.json({
      message: "Categories retrieved successfully",
      data: merged,
    });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const doc = await Category.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    next(err);
  }
}

module.exports = {
  listCategories,
  createCategory,
};