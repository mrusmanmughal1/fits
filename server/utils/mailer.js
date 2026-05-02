const nodemailer = require("nodemailer");

let cachedTransporter = null;

// get gmail transporter
function getGmailTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.GMAIL_USER;
  const pass =
    "xdecqhvvfhgpdaux" ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing Gmail credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD (recommended) in .env"
    );
  }

  // transporter for gmail
  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  return cachedTransporter;
}

async function sendMail({ to, subject, text, html }) {
  const transporter = getGmailTransporter();
  const from = process.env.MAIL_FROM || process.env.GMAIL_USER;

  return transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };
