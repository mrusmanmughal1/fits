"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  resetPassword as resetPasswordService,
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/services/auth";

export function useResetPassword() {
  const mutation = useMutation<
    ResetPasswordResponse,
    AxiosError<any>,
    ResetPasswordPayload
  >({
    mutationFn: resetPasswordService,
    onSuccess: (data) => {
      toast.success(data?.message || "Password updated successfully", {
        id: "reset-password-success",
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to reset password",
        { id: "reset-password-error" }
      );
    },
  });

  const submitResetPassword = (payload: ResetPasswordPayload) =>
    mutation.mutateAsync(payload);

  return {
    submitResetPassword,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    reset: mutation.reset,
  } as const;
}


