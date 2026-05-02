const express = require("express");
const validate = require("../middleware/validate");
const { addToCart, productIdParam } = require("../schemas/cart");
const router = express.Router();
const ctrl = require("../controllers/cartController");

router.get("/", ctrl.getCart);
router.post("/", validate(addToCart), ctrl.addToCart);
router.delete(
  "/:productId",
  validate(productIdParam, "params"),
  ctrl.removeFromCart
);
router.put(
  "/:productId",
  validate(productIdParam, "params"),
  ctrl.updateCartItem
);

module.exports = router;
