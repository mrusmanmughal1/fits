const { z } = require("zod");

const createBrand = z.object({
  name: z.string().min(1, "Brand name is required"),
  logo: z.string().url("Must be a valid URL").optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const updateBrand = z.object({
  name: z.string().min(1).optional(),
  logo: z.string().url().optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const idParam = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid brand id"),
});

module.exports = { createBrand, updateBrand, idParam };
