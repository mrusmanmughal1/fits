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
    res.status(201).json({
      message: "Category created successfully",
      data: doc,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    next(err);
  }
}

async function listAllCategories(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [categories, total] = await Promise.all([
      Category.find().skip(skip).limit(Number(limit)).lean(),
      Category.countDocuments(),
    ]);

    res.json({
      message: "All categories retrieved successfully",
      data: {
        data: categories,
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const doc = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!doc) return res.status(404).json({ message: "Category not found" });
    res.json({
      message: "Category updated successfully",
      data: doc,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const doc = await Category.findByIdAndDelete(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({
      message: "Category deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listCategories,
  createCategory,
  listAllCategories,
  updateCategory,
  deleteCategory,
};
