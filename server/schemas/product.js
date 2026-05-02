const { z } = require("zod");

const specificationSchema = z.object({
  key: z.string().min(1, "Specification key is required"),
  value: z.string().min(1, "Specification value is required"),
});

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

const createProduct = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  brand: objectIdSchema,
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  discountPrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative().default(0),
  images: z.array(z.string().url("Must be a valid URL")).optional(),
  specifications: z.array(specificationSchema).optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(['Active', 'Draft', 'Archived']).optional(),
});

const updateProduct = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().optional(),
  description: z.string().min(1).optional(),
  brand: objectIdSchema.optional(),
  category: z.string().min(1).optional(),
  price: z.coerce.number().nonnegative().optional(),
  discountPrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative().optional(),
  images: z.array(z.string().url()).optional(),
  specifications: z.array(specificationSchema).optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(['Active', 'Draft', 'Archived']).optional(),
});

const idParam = z.object({
  id: objectIdSchema,
});

module.exports = { createProduct, updateProduct, idParam };
