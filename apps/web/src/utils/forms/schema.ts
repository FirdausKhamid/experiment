import { z } from "zod";
import { RegisterSchema } from "@experiment/shared";
import type { FieldConfig, FormModel } from "./types";

export const RegisterFormSchema = RegisterSchema.extend({
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * Build a Zod schema from a form model (dynamic validation).
 */
function zodForField(f: FieldConfig): z.ZodTypeAny {
  switch (f.type) {
    case "text":
    case "password":
      return f.required
        ? z.string().min(1, `${f.label} is required`)
        : z.string().optional();
    case "number":
      return z.number({ message: `${f.label} must be a number` });
    case "checkbox":
      return z.boolean().optional();
    case "select":
      return f.required
        ? z.string().min(1, `${f.label} is required`)
        : z.string().optional();
    case "date":
      return z.string().optional();
    case "array":
      return f.item
        ? z.array(zodForField(f.item))
        : z.array(z.any());
    default:
      return z.any();
  }
}

export function zodFromModel(model: FormModel): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape = model.steps.reduce<Record<string, z.ZodTypeAny>>((acc, step) => {
    for (const field of step.fields) {
      acc[field.name] = zodForField(field);
    }
    return acc;
  }, {});
  return z.object(shape);
}
