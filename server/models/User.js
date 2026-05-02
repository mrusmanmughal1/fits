const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
  line1: { type: String },
  line2: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  isDefault: { type: Boolean, default: false },
});

const refreshTokenSchema = new Schema({
  tokenHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    password: { type: String, required: true },

    // Password reset (store only hash; never store raw token)
    passwordResetTokenHash: { type: String },
    passwordResetExpiresAt: { type: Date },

    // Email verification
    emailVerificationTokenHash: { type: String },
    emailVerificationExpiresAt: { type: Date },
    // last login 
    lastLogin: { type: Date },
    addresses: { type: [addressSchema], default: [] },
    refreshTokens: { type: [refreshTokenSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
