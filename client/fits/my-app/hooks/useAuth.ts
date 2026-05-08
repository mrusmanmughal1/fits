import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a stable "loading" state until hydrated and mounted
  if (!mounted || !isHydrated) {
    return {
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      logout,
    } as const;
  }

  return { user, isAuthenticated, isHydrated, logout } as const;
}


