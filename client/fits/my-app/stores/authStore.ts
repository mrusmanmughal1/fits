"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthResponse } from "@/services/auth";
import { clearAuthTokens, getAccessToken } from "@/services/token";

export type AuthUser = NonNullable<AuthResponse["user"]>;

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  /** Call after a successful login/register API response */
  loginSuccess: (data: AuthResponse) => void;
  /** Manually set user (rarely needed) */
  setUser: (user: AuthUser | null) => void;
  /** Clears tokens + user */
  logout: () => void;
  /** Recompute auth state from stored token (useful on app start) */
  hydrateFromToken: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: Boolean(getAccessToken()),

      loginSuccess: (data) => {
        // tokens are saved by services/auth.ts via setAuthTokens()
        set({
          user: (data.user as AuthUser) ?? null,
          isAuthenticated: true,
        });
      },

      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),

      logout: () => {
        clearAuthTokens();
        set({ user: null, isAuthenticated: false });
      },

      hydrateFromToken: () => {
        const hasToken = Boolean(getAccessToken());
        set({ isAuthenticated: hasToken });
      },
    }),
    {
      name: "fits_auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
);
