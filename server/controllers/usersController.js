const User = require("../models/User");

async function getAllUsers(req, res, next) {
  try {
    // Exclude sensitive fields
    const users = await User.find().select(
      "-password -refreshTokens -passwordResetTokenHash -passwordResetExpiresAt -emailVerificationTokenHash -emailVerificationExpiresAt"
    );
    return res.json({ data: { success: true, users } });
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const requestedId = req.params.id;
    const requesterId = req.user && req.user._id ? String(req.user._id) : null;
    const isAdmin = req.user && req.user.role === "admin";

    // Allow: admin OR the user requesting their own record
    if (!isAdmin && requesterId !== String(requestedId)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(requestedId).select(
      "-password -refreshTokens -passwordResetTokenHash -passwordResetExpiresAt -emailVerificationTokenHash -emailVerificationExpiresAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ data: { success: true, user } });
  } catch (err) {
    next(err);
  }
}

async function updateUserById(req, res, next) {
  try {
    const requestedId = req.params.id;
    const updates = { ...req.body };

    // Prevent password changes here (use update-password endpoint)
    delete updates.password;

    // If email is being changed, enforce uniqueness
    if (updates.email) {
      const existing = await User.findOne({
        email: updates.email,
        _id: { $ne: requestedId },
      });
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const user = await User.findByIdAndUpdate(requestedId, updates, {
      new: true,
      runValidators: true,
    }).select(
      "-password -refreshTokens -passwordResetTokenHash -passwordResetExpiresAt -emailVerificationTokenHash -emailVerificationExpiresAt"
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ data: { success: true, user } });
  } catch (err) {
    next(err);
  }
}

async function updateMe(req, res, next) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const requestedId = String(req.user._id);
    const updates = { ...req.body };

    // Self updates: never allow privileged fields
    delete updates.role;
    delete updates.status;
    delete updates.isEmailVerified;
    // Prevent password changes here (use update-password endpoint)
    delete updates.password;

    // If email is being changed, enforce uniqueness
    if (updates.email) {
      const existing = await User.findOne({
        email: updates.email,
        _id: { $ne: requestedId },
      });
      if (existing) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    const user = await User.findByIdAndUpdate(requestedId, updates, {
      new: true,
      runValidators: true,
    }).select(
      "-password -refreshTokens -passwordResetTokenHash -passwordResetExpiresAt -emailVerificationTokenHash -emailVerificationExpiresAt"
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ data: { success: true, user } });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  updateMe,
};
