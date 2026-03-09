"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

/**
 * Redirects by auth state: if access_token exists -> /dashboard, else -> /login.
 * Use as the default start page (e.g. at /).
 */
export function RedirectByAuth() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user?.access_token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router, user?.access_token]);

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-500">
      Loading…
    </div>
  );
}
