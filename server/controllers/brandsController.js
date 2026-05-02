const Brand = require("../models/Brand");

async function listBrands(req, res, next) {
  try {
    const brands = await Brand.find().lean();
    res.json(brands);
  } catch (err) {
    next(err);
  }
}

async function createBrand(req, res, next) {
  try {
    const newB = await Brand.create(req.body);
    res.status(201).json(newB);
  } catch (err) {
    next(err);
  }
}

async function updateBrand(req, res, next) {
  try {
    const b = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!b) return res.status(404).json({ message: "Brand not found" });
    res.json(b);
  } catch (err) {
    next(err);
  }
}

async function deleteBrand(req, res, next) {
  try {
    const b = await Brand.findByIdAndDelete(req.params.id).lean();
    if (!b) return res.status(404).json({ message: "Brand not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
