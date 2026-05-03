const Product = require("../models/Product");

async function listProducts(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (brand) {
      query.brand = brand;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate("brand", "name")
        .lean(),
      Product.countDocuments(query),
    ]);

    res.json({
      message: "Products retrieved successfully",
      data: {
        data: products,
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

async function getProduct(req, res, next) {
  try {
    const p = await Product.findById(req.params.id).populate("brand").lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json({
      message: "Product retrieved successfully",
      data: p,
    });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const newP = await Product.create(req.body);
    res.status(201).json({
      message: "Product created successfully",
      data: newP,
    });
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
    res.json({
      message: "Product updated successfully",
      data: p,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const p = await Product.findByIdAndDelete(req.params.id).lean();
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      message: "Product deleted successfully",
      data: null,
    });
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
