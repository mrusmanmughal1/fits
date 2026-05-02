const express = require("express");
const validate = require("../middleware/validate");
const authenticate = require("../middleware/auth");
const loginRateLimiter = require("../middleware/loginRateLimiter");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updatePassword,
} = require("../schemas/auth");
const router = express.Router();
const ctrl = require("../controllers/authController");

router.post("/register", validate(register), ctrl.register);
router.post("/login", loginRateLimiter, validate(login), ctrl.login);
router.post("/forgot-password", validate(forgotPassword), ctrl.forgotPassword);
router.post("/reset-password", validate(resetPassword), ctrl.resetPassword);
router.post("/verify-email", validate(verifyEmail), ctrl.verifyEmail);
router.post(
  "/update-password",
  authenticate,
  validate(updatePassword),
  ctrl.updatePassword
);
router.post("/refresh", ctrl.refresh);
router.post("/logout", ctrl.logout);

module.exports = router;
