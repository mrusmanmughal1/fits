"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  forgotPassword as forgotPasswordService,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "@/services/auth";

export function useForgotPassword() {
  const mutation = useMutation<
    ForgotPasswordResponse,
    AxiosError<any>,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPasswordService,
    onSuccess: (data) => {
      toast.success(data?.message || "Reset link sent", {
        id: "forgot-password-success",
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Failed to send reset link",
        { id: "forgot-password-error" }
      );
    },
  });

  const sendResetLink = (payload: ForgotPasswordPayload) =>
    mutation.mutateAsync(payload);

  return {
    sendResetLink,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    reset: mutation.reset,
  } as const;
}


