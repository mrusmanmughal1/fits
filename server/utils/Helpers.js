function isStrongPassword(pw) {
  if (typeof pw !== "string") return false;
  // Keep this policy in sync with `schemas/auth.js`
  if (pw.length < 8 || pw.length > 128) return false;
  if (/\s/.test(pw)) return false;
  if (!/[a-z]/.test(pw)) return false;
  if (!/[A-Z]/.test(pw)) return false;
  if (!/[0-9]/.test(pw)) return false;
  if (!/[^A-Za-z0-9]/.test(pw)) return false;
  return true;
}
module.exports = {
  isStrongPassword,
};
