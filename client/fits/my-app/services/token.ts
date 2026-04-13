export const ACCESS_TOKEN_KEY = "access_token";
// NOTE: refresh token is stored in cookies (typically HttpOnly) by the backend.
// We do NOT store refresh tokens in localStorage.

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function setAuthTokens({
  accessToken,
}: {
  accessToken: string;
}) {
  if (accessToken) setAccessToken(accessToken);
}

export function clearAuthTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
