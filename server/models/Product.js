const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true, sparse: true },
    description: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String }],
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],
    features: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    status: { 
      type: String, 
      enum: ['Active', 'Draft', 'Archived'], 
      default: 'Active' 
    },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
