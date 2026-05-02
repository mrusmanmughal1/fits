const { Schema, model } = require("mongoose");

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String }, // Optional image URL for the brand's logo
    description: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = model("Brand", brandSchema);
