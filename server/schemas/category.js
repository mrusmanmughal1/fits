const { z } = require("zod");

const createCategory = z.object({
  name: z.string().min(1, "Category name is required"),
});

module.exports = { createCategory };
