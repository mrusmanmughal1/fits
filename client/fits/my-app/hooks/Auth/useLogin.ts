"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  login as loginService,
  LoginPayload,
  AuthResponse,
} from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";
import { setAuthTokens } from "@/services/token";
export function useLogin() {
  const loginSuccess = useAuthStore((s) => s.loginSuccess);

  const mutation = useMutation<AuthResponse, AxiosError<any>, LoginPayload>({
    mutationFn: loginService,
    onSuccess: (data) => {
      if (data?.accessToken || data?.token) {
        setAuthTokens({
          accessToken: (data?.accessToken || data?.token) as string,
        });
      }
      // accessToken is stored by services/auth.ts; refreshToken is in cookies.
      loginSuccess(data);
      toast.success(data?.message || "Login successful", {
        id: "login-success",
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Login failed",
        { id: "login-error" }
      );
    },
  });

  const login = (payload: LoginPayload) => mutation.mutateAsync(payload);

  return {
    login,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    reset: mutation.reset,
  } as const;
}
