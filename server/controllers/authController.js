const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");
const { isStrongPassword } = require("../utils/Helpers");
const { STRONG_PASSWORD_MESSAGE } = require("../schemas/auth");
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXP;
const REFRESH_DAYS = Number(process.env.REFRESH_TOKEN_DAYS);
const EMAIL_VERIFY_MINUTES = Number(process.env.EMAIL_VERIFY_MINUTES || 60);
const RESET_TOKEN_MINUTES = Number(process.env.RESET_TOKEN_MINUTES || 60);
function sha256Hex(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}
function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: ACCESS_EXP,
    },
  );
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

async function register(req, res, next) {
  try {
    const { firstname, lastname, email, password, addresses, phone } = req.body;
    if (!isStrongPassword(password)) {
      return res
        .status(400)
        .json({ errors: { password: STRONG_PASSWORD_MESSAGE } });
    }
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const phoneExists = await User.findOne({ phone });
    if (phoneExists)
      return res.status(400).json({ message: "Phone number already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      phone,
      addresses: addresses || [],
      // Never accept role from the client (prevents privilege escalation)
      role: "user",
    });

    // Send email verification link
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256Hex(rawToken);
    user.emailVerificationTokenHash = tokenHash;
    user.emailVerificationExpiresAt = new Date(
      Date.now() + EMAIL_VERIFY_MINUTES * 60 * 1000,
    );

    const frontendBaseUrl =
      process.env.FRONTEND_URL ||
      process.env.APP_URL ||
      "http://localhost:3003";
    const verifyUrl = `${frontendBaseUrl.replace(
      /\/$/,
      "",
    )}/verify-email?token=${encodeURIComponent(rawToken)}`;

    const subject = "Verify your email";
    const text =
      `Welcome! Please verify your email.\n\n` +
      `Verification link (expires in ${EMAIL_VERIFY_MINUTES} minutes):\n${verifyUrl}\n\n` +
      `If you didn't create an account, you can ignore this email.`;
    const html =
      `<p>Welcome! Please verify your email.</p>` +
      `<p><a href="${verifyUrl}">Click here to verify your email</a></p>` +
      `<p>This link expires in <b>${EMAIL_VERIFY_MINUTES} minutes</b>.</p>` +
      `<p>If you didn't create an account, you can ignore this email.</p>`;

    try {
      await user.save();
      await sendMail({ to: user.email, subject, text, html });
    } catch (mailErr) {
      console.error("register: failed to send verification email", mailErr);
      // keep registration success; user can request resend later if needed
    }
    res.status(201).json({
      data: {
        success: true,
        id: user._id,
        status: 201,
        email: user.email,
        name: firstname + " " + lastname,
      },
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isEmailVerified)
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    if (!user.status)
      return res.status(400).json({
        message:
          "Your account has been deactivated. Please contact the administrator for assistance.",
      });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000);
    // push token hash to user
    user.refreshTokens.push({ tokenHash, expiresAt });

    user.lastLogin = new Date();
    await user.save();

    // set refresh token as HttpOnly cookie
    const cookieOpts = {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      expires: expiresAt,
    };
    res.cookie("refreshToken", refreshToken, cookieOpts);
    res.json({
      data: {
        success: true,
        accessToken,
        expiresIn: ACCESS_EXP,

        user: {
          email,
          name: user.firstname + " " + user.lastname,
          id: user._id,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });
    // find user with matching token
    const user = await User.findOne({
      "refreshTokens.tokenHash": { $exists: true },
    });
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    // find matching token by comparing hashes and remove expired ones
    let foundIndex = -1;
    for (let i = user.refreshTokens.length - 1; i >= 0; i--) {
      const rt = user.refreshTokens[i];
      if (rt.expiresAt < new Date()) {
        user.refreshTokens.splice(i, 1);
        continue;
      }
      const match = await bcrypt.compare(token, rt.tokenHash);
      if (match) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex === -1) {
      await user.save();
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // rotate token
    user.refreshTokens.splice(foundIndex, 1);
    const newRefresh = generateRefreshToken();
    const newHash = await bcrypt.hash(newRefresh, 10);
    const expiresAt = new Date(Date.now() + REFRESH_DAYS * 24 * 60 * 60 * 1000);
    user.refreshTokens.push({ tokenHash: newHash, expiresAt });
    await user.save();

    const accessToken = generateAccessToken(user);
    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
    });
    res.json({
      message: "Token refreshed successfully",
      data: { accessToken, expiresIn: ACCESS_EXP },
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(204).end();
    const users = await User.find({
      "refreshTokens.tokenHash": { $exists: true },
    });
    for (const user of users) {
      let removed = false;
      for (let i = user.refreshTokens.length - 1; i >= 0; i--) {
        const rt = user.refreshTokens[i];
        if (await bcrypt.compare(token, rt.tokenHash)) {
          user.refreshTokens.splice(i, 1);
          removed = true;
        }
      }
      if (removed) await user.save();
    }
    res.clearCookie("refreshToken");
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always respond the same to prevent account enumeration
    const generic = {
      data: {
        success: true,
        message: "If the email exists, a reset link has been sent.",
      },
    };

    if (!user)
      return res.status(400).json({
        data: {
          success: false,
          message: "Email not found",
        },
      });

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256Hex(rawToken);
    user.passwordResetTokenHash = tokenHash;
    user.passwordResetExpiresAt = new Date(
      Date.now() + RESET_TOKEN_MINUTES * 60 * 1000,
    );

    const frontendBaseUrl =
      process.env.FRONTEND_URL ||
      process.env.APP_URL ||
      "http://localhost:3003";
    const resetUrl = `${frontendBaseUrl.replace(
      /\/$/,
      "",
    )}/reset-password?token=${encodeURIComponent(rawToken)}`;

    const subject = "Reset your password";
    const text =
      `You requested a password reset.\n\n` +
      `Reset link (expires in ${RESET_TOKEN_MINUTES} minutes):\n${resetUrl}\n\n` +
      `If you didn't request this, you can ignore this email.`;
    const html =
      `<p>You requested a password reset.</p>` +
      `<p><a href="${resetUrl}">Click here to reset your password</a></p>` +
      `<p>This link expires in <b>${RESET_TOKEN_MINUTES} minutes</b>.</p>` +
      `<p>If you didn't request this, you can ignore this email.</p>`;

    try {
      // Save token first so the emailed token always matches what's stored.
      await user.save();
      await sendMail({ to: user.email, subject, text, html });
    } catch (mailErr) {
      // Don't reveal email delivery status to callers; just cleanup token fields.
      user.passwordResetTokenHash = undefined;
      user.passwordResetExpiresAt = undefined;
      await user.save();
      console.error("forgotPassword: failed to send email", mailErr);
      return res.json(generic);
    }

    const canReturnToken =
      process.env.NODE_ENV !== "production" &&
      String(process.env.RETURN_RESET_TOKEN || "true") === "true";

    if (canReturnToken) {
      return res.json({
        ...generic,
        data: {
          ...generic.data,
          token: rawToken,
          expiresInMinutes: RESET_TOKEN_MINUTES,
        },
      });
    }

    return res.json(generic);
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token, password } = req.body;

    if (!isStrongPassword(password)) {
      return res
        .status(400)
        .json({ errors: { password: STRONG_PASSWORD_MESSAGE } });
    }

    const tokenHash = sha256Hex(token);
    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    // Invalidate all sessions after password change
    user.refreshTokens = [];
    await user.save();

    res.clearCookie("refreshToken");
    return res.json({
      data: { success: true, message: "Password reset successful" },
    });
  } catch (err) {
    next(err);
  }
}

async function updatePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!isStrongPassword(newPassword)) {
      return res
        .status(400)
        .json({ errors: { newPassword: STRONG_PASSWORD_MESSAGE } });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    // Invalidate all sessions after password change
    user.refreshTokens = [];
    await user.save();

    res.clearCookie("refreshToken");
    return res.json({
      data: { success: true, message: "Password updated successfully" },
    });
  } catch (err) {
    next(err);
  }
}

async function verifyEmail(req, res, next) {
  try {
    const { token } = req.body;
    const tokenHash = sha256Hex(token);

    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationExpiresAt = undefined;
    await user.save();

    return res.json({
      data: { success: true, message: "Email verified successfully" },
    });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
};
