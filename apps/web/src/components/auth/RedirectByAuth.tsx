"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { SplashScreen } from "./SplashScreen";

/**
 * Redirects by auth state: if access_token exists -> /dashboard, else -> /login.
 * Use as the default start page (e.g. at /).
 * Shows splash until auth is rehydrated so we don't flash login on refresh.
 */
export function RedirectByAuth() {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hasHydrated) return;
    if (user?.access_token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [hasHydrated, router, user?.access_token]);

  return <SplashScreen />;
}
