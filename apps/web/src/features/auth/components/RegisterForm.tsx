"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { useFormModelStore } from "@/stores/formModelStore";
import { RegisterDto } from "@experiment/shared";
import { FormBuilder } from "@/utils/forms/FormBuilder";
import { RegisterFormSchema } from "@/utils/forms/schema";
import { registerFormModel } from "@/models/form/auth";
import { FormError } from "@/components/ui/FormError";
import { SplashScreen } from "@/components/auth/SplashScreen";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export function RegisterForm() {
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const { register: doRegister, error, isLoading } = useAuthStore();
  const setModel = useFormModelStore((s) => s.setModel);

  useEffect(() => {
    setModel(registerFormModel);
    return () => setModel(null);
  }, [setModel]);

  if (!hasHydrated) {
    return <SplashScreen />;
  }

  const onSubmit = async (data: RegisterFormData) => {
    const payload: RegisterDto = {
      username: data.username,
      password: data.password,
    };
    await doRegister(payload);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div>
          <p className="auth-subtitle">
            Already have an account?{" "}
            <Link href="/login" className="auth-link">
              Sign in instead
            </Link>
          </p>
        </div>

        <FormBuilder
          schema={RegisterFormSchema}
          defaultValues={{ username: "", password: "", confirmPassword: "" }}
          onSubmit={onSubmit}
          submitLabel="Register"
          isSubmitting={isLoading}
          errorSlot={<FormError error={error} />}
        />
      </div>
    </div>
  );
}
