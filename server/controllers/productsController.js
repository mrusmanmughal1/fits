const Product = require("../models/Product");

async function listProducts(req, res, next) {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const newP = await Product.create(req.body);
    res.status(201).json(newP);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const updates = req.body;
    const p = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const p = await Product.findByIdAndDelete(req.params.id).lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
