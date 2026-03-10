"use client";

/**
 * Full-screen splash shown while auth state is being evaluated (e.g. rehydration from localStorage).
 * Prevents flashing the login page when the user is actually authenticated after refresh.
 */
export function SplashScreen() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      <p className="mt-4 text-sm text-gray-500">Loading…</p>
    </div>
  );
}
