"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormModelStore } from "@/stores/formModelStore";
import { zodFromModel } from "./schema";
import { FieldRenderer } from "./FieldRenderer";

type FormBuilderProps<T extends z.ZodType> = {
  /** Optional schema override (e.g. register form with confirmPassword refine). Otherwise derived from model. */
  schema?: T;
  /** Default form values */
  defaultValues?: z.infer<T> extends object ? z.infer<T> : never;
  onSubmit: (data: z.infer<T>) => void | Promise<void>;
  /** Submit button label */
  submitLabel?: string;
  /** Disable submit (e.g. loading) */
  isSubmitting?: boolean;
  /** Optional slot for error alert above the form */
  errorSlot?: React.ReactNode;
  /** Optional footer (e.g. link to login/register) */
  children?: React.ReactNode;
};

const emptySchema = z.object({});

export function FormBuilder<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
  isSubmitting = false,
  errorSlot,
  children,
}: FormBuilderProps<T>) {
  const { model, currentStep, next, prev } = useFormModelStore();

  // Resolve schema and defaults unconditionally so hooks are always called in the same order
  const resolvedSchema = model ? (schema ?? zodFromModel(model)) : emptySchema;
  const values = (defaultValues ?? {}) as Record<string, unknown>;

  const methods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(resolvedSchema as any),
    defaultValues: values,
  });

  if (!model) {
    return (
      <p className="text-gray-500">No form model. Set model before rendering FormBuilder.</p>
    );
  }

  const step = model.steps[currentStep];
  const isLastStep = currentStep >= model.steps.length - 1;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit as (data: unknown) => void)}
        className="mt-8 space-y-6"
      >
        {errorSlot}

        <div className="form-group space-y-4">
          <h2 className="auth-title">{step.title}</h2>
          {step.fields.map((field) => (
            <FieldRenderer key={field.name} field={field} />
          ))}
        </div>

        <div className="flex gap-2">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          ) : null}
          {isLastStep ? (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Please wait..." : submitLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="btn-primary"
            >
              Next
            </button>
          )}
        </div>

        {children}
      </form>
    </FormProvider>
  );
}
