"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useFormModelStore } from "@/stores/formModelStore";
import { LoginSchema, LoginDto } from "@experiment/shared";
import { FormBuilder } from "@/utils/forms/FormBuilder";
import { loginFormModel } from "@/models/form/auth";
import { FormError } from "@/components/ui/FormError";
import { SplashScreen } from "@/components/auth/SplashScreen";

export function LoginForm() {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const user = useAuthStore((s) => s.user);
  const { login, error, isLoading } = useAuthStore();
  const setModel = useFormModelStore((s) => s.setModel);

  useEffect(() => {
    setModel(loginFormModel);
    return () => setModel(null);
  }, [setModel]);

  // If already logged in (access_token in store), go to dashboard
  useEffect(() => {
    if (!hasHydrated) return;
    if (user?.access_token) router.replace("/dashboard");
  }, [hasHydrated, router, user?.access_token]);

  if (!hasHydrated) {
    return <SplashScreen />;
  }

  const onSubmit = async (data: LoginDto) => {
    const success = await login(data);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <FormBuilder
          schema={LoginSchema}
          defaultValues={{ username: "", password: "" }}
          onSubmit={onSubmit}
          submitLabel="Sign in"
          isSubmitting={isLoading}
          errorSlot={<FormError error={error} />}
        >
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="form-checkbox"
              />
              <label htmlFor="remember-me" className="form-checkbox-label">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="auth-link">
                Forgot your password?
              </a>
            </div>
          </div>
        </FormBuilder>
        <div className="mt-4">
          <p className="auth-subtitle">
            <Link href="/register" className="auth-link">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
