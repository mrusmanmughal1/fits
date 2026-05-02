const { z } = require("zod");

const userIdParam = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user id" }),
});

const updateUserBody = z
  .object({
    firstname: z.string().min(1, { message: "First Name is required" }).optional(),
    lastname: z.string().min(1, { message: "Last Name is required" }).optional(),
    email: z.string().email({ message: "Please provide a valid email address" }).optional(),
    addresses: z.array(z.any()).optional(),

    // admin-only fields (enforced in controller)
    role: z.enum(["user", "admin"]).optional(),
    status: z.enum(["active", "blocked"]).optional(),
    isEmailVerified: z.boolean().optional(),
  })
  .strict();

module.exports = { userIdParam, updateUserBody };
