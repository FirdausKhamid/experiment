"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { SplashScreen } from "./SplashScreen";

type RequireAuthProps = {
  children: React.ReactNode;
};

/**
 * Redirects to /login if there is no access_token. Use to protect routes like /dashboard.
 * Shows a splash until auth state is rehydrated so we don't flash login on refresh.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hasHydrated) return;
    if (user?.access_token == null) {
      router.replace("/login");
    }
  }, [hasHydrated, router, user?.access_token]);

  if (!hasHydrated) {
    return <SplashScreen />;
  }

  if (user?.access_token == null) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
