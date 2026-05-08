"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyEmail } from "@/services/auth";
import { toast } from "react-hot-toast";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Email verification failed";
      toast.error(message);
    },
  });
}
