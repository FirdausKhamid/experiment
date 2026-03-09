export type FieldType =
  | "text"
  | "password"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "array";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  required?: boolean;
  rules?: { when: string; equals?: unknown }[];
  item?: Omit<FieldConfig, "rules">;
};

export type FormStep = {
  id: string;
  title: string;
  fields: FieldConfig[];
};

export type FormModel = {
  id: string;
  title: string;
  steps: FormStep[];
};
