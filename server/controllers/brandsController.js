const Brand = require("../models/Brand");

async function listBrands(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [brands, total] = await Promise.all([
      Brand.find().skip(skip).limit(Number(limit)).lean(),
      Brand.countDocuments(),
    ]);

    res.json({
      message: "Brands retrieved successfully",
      data: {
        data: brands,
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

async function createBrand(req, res, next) {
  try {
    const newB = await Brand.create(req.body);
    res.status(201).json({
      message: "Brand created successfully",
      data: newB,
    });
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
    res.json({
      message: "Brand updated successfully",
      data: b,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteBrand(req, res, next) {
  try {
    const b = await Brand.findByIdAndDelete(req.params.id).lean();
    if (!b) return res.status(404).json({ message: "Brand not found" });
    res.status(200).json({
      message: "Brand deleted successfully",
      data: null,
    });
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
