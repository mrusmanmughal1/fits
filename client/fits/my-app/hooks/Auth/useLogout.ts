"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { logout as logoutService, LogoutResponse } from "@/services/auth";
import { useAuthStore } from "@/stores/authStore";

type LogoutOptions = {
  redirectTo?: string;
  onSuccess?: (data: LogoutResponse) => void;
};

export function useLogout() {
  const router = useRouter();
  const storeLogout = useAuthStore((s) => s.logout);

  const mutation = useMutation<
    LogoutResponse,
    AxiosError<any>,
    LogoutOptions | undefined
  >({
    mutationFn: () => logoutService(),
    onSuccess: (data, options) => {
      storeLogout();
      toast.success(data?.message || "Logged out", { id: "logout-success" });
      options?.onSuccess?.(data);
      if (options?.redirectTo) router.push(options.redirectTo);
    },
    onError: (err) => {
      // Even if server logout fails, we can still clear local session
      storeLogout();
      toast.error(
        err?.response?.data?.message || err?.message || "Logout failed",
        { id: "logout-error" }
      );
      router.push("/login");
    },
  });

  const logout = (options?: LogoutOptions) => mutation.mutateAsync(options);

  return {
    logout,
    isLoading: mutation.isPending,
    error: mutation.error ? mutation.error.message : null,
    reset: mutation.reset,
  } as const;
}
