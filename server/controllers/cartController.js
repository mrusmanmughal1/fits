const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function _getDefaultCart() {
  let cart = await Cart.findOne({ name: "default" });
  if (!cart) cart = await Cart.create({ name: "default", items: [] });
  return cart;
}

async function getCart(req, res, next) {
  try {
    const cart = await _getDefaultCart();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

async function addToCart(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity) || 1;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const cart = await _getDefaultCart();
    const existing = cart.items.find((it) => it.product.equals(product._id));
    if (existing) existing.quantity += qty;
    else cart.items.push({ product: product._id, quantity: qty });
    await cart.save();
    await cart.populate("items.product");
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
}

async function removeFromCart(req, res, next) {
  try {
    const productId = req.params.productId;
    const cart = await _getDefaultCart();
    const idx = cart.items.findIndex((it) => it.product.equals(productId));
    if (idx === -1)
      return res.status(404).json({ message: "Item not found in cart" });
    cart.items.splice(idx, 1);
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

async function updateCartItem(req, res, next) {
  try {
    const productId = req.params.productId;
    const qty = Number(req.body.quantity);
    if (qty <= 0)
      return res.status(400).json({ message: "Quantity must be > 0" });
    const cart = await _getDefaultCart();
    const item = cart.items.find((it) => it.product.equals(productId));
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });
    item.quantity = qty;
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addToCart, removeFromCart, updateCartItem };
