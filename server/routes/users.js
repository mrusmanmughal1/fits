const express = require("express");
const authenticate = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");
const { userIdParam, updateUserBody } = require("../schemas/user");
const ctrl = require("../controllers/usersController");

const router = express.Router();

// Get all users (protected)
router.get("/", authenticate, requireAdmin, ctrl.getAllUsers);
// Get user by id (admin OR self)
router.get(
  "/:id",
  authenticate,
  validate(userIdParam, "params"),
  ctrl.getUserById
);
// Update user by id (admin OR self)
router.patch("/me", authenticate, validate(updateUserBody), ctrl.updateMe);
router.patch(
  "/:id",
  authenticate,
  requireAdmin,
  validate(userIdParam, "params"),
  validate(updateUserBody),
  ctrl.updateUserById
);

module.exports = router;
