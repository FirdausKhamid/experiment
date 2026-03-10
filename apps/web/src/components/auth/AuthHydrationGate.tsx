"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

/**
 * Sets _hasHydrated on the auth store after the first client mount.
 * Persist middleware (sync localStorage) rehydrates before this runs, so we avoid
 * relying on onRehydrateStorage (which can get overwritten with sync storage).
 * Renders nothing; use once in root layout.
 */
export function AuthHydrationGate() {
  useEffect(() => {
    useAuthStore.setState({ _hasHydrated: true });
  }, []);
  return null;
}
