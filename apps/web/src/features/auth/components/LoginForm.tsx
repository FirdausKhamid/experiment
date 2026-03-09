"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useFormModelStore } from "@/stores/formModelStore";
import { LoginSchema, LoginDto } from "@experiment/shared";
import { FormBuilder } from "@/utils/forms/FormBuilder";
import { loginFormModel } from "@/models/form/auth";
import { FormError } from "@/components/ui/FormError";
import { isFailure } from "@/utils/error";

export function LoginForm() {
  const { login, error, isLoading } = useAuthStore();
  const setModel = useFormModelStore((s) => s.setModel);

  useEffect(() => {
    setModel(loginFormModel);
    return () => setModel(null);
  }, [setModel]);

  const onSubmit = async (data: LoginDto) => {
    const result = await login(data);
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
