"use client";

import { useFormContext } from "react-hook-form";
import type { FieldConfig } from "./types";

type FieldRendererProps = {
  field: FieldConfig;
};

export function FieldRenderer({ field }: FieldRendererProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[field.name];
  const errorMessage = error?.message as string | undefined;

  const inputClass = `form-input ${errorMessage ? "border-red-500" : ""}`;

  if (field.type === "checkbox") {
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            id={field.name}
            type="checkbox"
            {...register(field.name)}
            className="form-checkbox"
          />
          <label htmlFor={field.name} className="form-checkbox-label">
            {field.label}
          </label>
        </div>
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }

  const inputType =
    field.type === "password" ? "password" : field.type === "number" ? "number" : "text";

  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="form-label">
        {field.label}
      </label>
      <div className="mt-2">
        <input
          id={field.name}
          type={inputType}
          placeholder={field.placeholder}
          {...register(field.name)}
          className={inputClass}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
