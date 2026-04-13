"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import {
  register as registerService,
  RegisterPayload,
  AuthResponse,
} from "@/services/auth";

type RegisterOptions = {
  resetForm?: () => void;
  redirectTo?: string;
  onSuccess?: (data: AuthResponse) => void;
};

export function useRegister() {
  const router = useRouter();

  const mutation = useMutation<AuthResponse, AxiosError<any>, RegisterPayload>({
    mutationFn: registerService,
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful", {
        id: "register-success",
      });
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Registration failed ",
        { id: "register-error" }
      );
    },
  });

  const register = async (
    payload: RegisterPayload,
    options?: RegisterOptions
  ) => {
    const res = await mutation.mutateAsync(payload, {
      onSuccess: (data) => {
        try {
          options?.resetForm?.();
          options?.onSuccess?.(data);
          if (options?.redirectTo) {
            router.push(options.redirectTo);
          }
        } catch (e) {
          // ignore
        }
      },
    });

    return res;
  };

  return {
    register,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    reset: mutation.reset,
  } as const;
}
