const { z } = require("zod");

const addToCart = z.object({
  productId: z.string().length(24),
  quantity: z.coerce.number().int().positive().optional(),
});

const productIdParam = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),
});

module.exports = { addToCart, productIdParam };
