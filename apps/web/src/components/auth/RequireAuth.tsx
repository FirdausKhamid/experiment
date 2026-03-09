"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

type RequireAuthProps = {
  children: React.ReactNode;
};

/**
 * Redirects to /login if there is no access_token. Use to protect routes like /dashboard.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user?.access_token == null) {
      router.replace("/login");
    }
  }, [router, user?.access_token]);

  if (user?.access_token == null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
