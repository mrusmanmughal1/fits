import http from "./http";
import { setAuthTokens } from "./token";
import { clearAuthTokens } from "./token";

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
  accessToken?: string;
  refreshToken?: string;
  token?: string;
  message?: string;
}

export interface LogoutResponse {
  message?: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  message?: string;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await http.post("/auth/register", payload);

  if (data?.accessToken || data?.token) {
    setAuthTokens({
      accessToken: data?.accessToken || data?.token,
    });
  }

  return data;
}
// sas
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await http.post("/auth/login", payload);

  if (data?.accessToken || data?.token) {
    setAuthTokens({
      accessToken: data?.accessToken || data?.token,
    });
  }

  return data.data;
}

export async function logout(): Promise<LogoutResponse> {
  // Backend should clear refreshToken cookie (HttpOnly) here
  const { data } = await http.post("/auth/logout", {});

  // Client clears access token from localStorage
  clearAuthTokens();

  return data;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> {
  const { data } = await http.post("/auth/forgot-password", payload);
  return data;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> {
  const { data } = await http.post("/auth/reset-password", payload);
  return data;
}
