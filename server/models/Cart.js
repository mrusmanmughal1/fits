const { Schema, model, Types } = require("mongoose");

const cartItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema(
  {
    name: { type: String, default: "default" },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
