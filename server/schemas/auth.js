const { z } = require("zod");

function isStrongPassword(pw) {
  if (typeof pw !== "string") return false;
  // Policy: 8-128 chars, no whitespace, at least 1 lowercase, 1 uppercase, 1 digit, 1 symbol.
  if (pw.length < 8 || pw.length > 128) return false;
  if (/\s/.test(pw)) return false;
  if (!/[a-z]/.test(pw)) return false;
  if (!/[A-Z]/.test(pw)) return false;
  if (!/[0-9]/.test(pw)) return false;
  if (!/[^A-Za-z0-9]/.test(pw)) return false;
  return true;
}

const strongPasswordMessage =
  "Password must be 8-128 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol (no spaces).";

const STRONG_PASSWORD_MESSAGE = strongPasswordMessage;

const register = z.object({
  firstname: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(1, { message: "First Name is required" })
  ),
  lastname: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(1, { message: "Last Name is required" })
  ),
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().email({ message: "Please provide a valid email address" })
  ),
  phone: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(10, { message: "Phone number must be 10 digits" }).max(10, { message: "Phone number must be 10 digits" })
  ),
  password: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z
      .string()
      .min(8, { message: strongPasswordMessage })
      .max(128, { message: strongPasswordMessage })
      .refine(isStrongPassword, { message: strongPasswordMessage })
  ),
  addresses: z
    .array(
      z.object({
        line1: z.string().optional(),
        line2: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
        isDefault: z.boolean().optional(),
      })
    )
    .optional(),
});

const login = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().email({ message: "Please provide a valid email address" })
  ),
  password: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z.string().min(1, { message: "Password is required" })
  ),
});

const forgotPassword = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().email({ message: "Please provide a valid email address" })
  ),
});

const resetPassword = z.object({
  token: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(1, { message: "Reset token is required" })
  ),
  password: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z
      .string()
      .min(8, { message: strongPasswordMessage })
      .max(128, { message: strongPasswordMessage })
      .refine(isStrongPassword, { message: strongPasswordMessage })
  ),
});

const verifyEmail = z.object({
  token: z.preprocess(
    (v) => (typeof v === "string" ? v.trim() : ""),
    z.string().min(1, { message: "Verification token is required" })
  ),
});

const updatePassword = z.object({
  currentPassword: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z.string().min(1, { message: "Current password is required" })
  ),
  newPassword: z.preprocess(
    (v) => (typeof v === "string" ? v : ""),
    z
      .string()
      .min(8, { message: strongPasswordMessage })
      .max(128, { message: strongPasswordMessage })
      .refine(isStrongPassword, { message: strongPasswordMessage })
  ),
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
  STRONG_PASSWORD_MESSAGE,
};
