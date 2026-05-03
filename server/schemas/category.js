const { z } = require("zod");

const createCategory = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const updateCategory = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const idParam = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid category id"),
});

module.exports = { createCategory, updateCategory, idParam };
