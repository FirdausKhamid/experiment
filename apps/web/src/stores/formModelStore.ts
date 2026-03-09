import { create } from "zustand";
import type { FormModel } from "@/utils/forms/types";

type FormModelState = {
  model: FormModel | null;
  currentStep: number;
  setModel: (m: FormModel | null) => void;
  next: () => void;
  prev: () => void;
};

export const useFormModelStore = create<FormModelState>((set, get) => ({
  model: null,
  currentStep: 0,
  setModel: (m) => set({ model: m, currentStep: 0 }),
  next: () => {
    const { model, currentStep } = get();
    if (model)
      set({
        currentStep: Math.min(currentStep + 1, model.steps.length - 1),
      });
  },
  prev: () => set({ currentStep: Math.max(get().currentStep - 1, 0) }),
}));
