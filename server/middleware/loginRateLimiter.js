const rateLimit = require("express-rate-limit");

const windowMinutes = Number(process.env.LOGIN_RATE_WINDOW_MINUTES || 15);
const maxAttempts = Number(process.env.LOGIN_RATE_MAX || 7);

const loginRateLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxAttempts,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
});

module.exports = loginRateLimiter;
