import { create } from "zustand";
import { pageDataService } from "@/data/services/pageDataService";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type SettingsState = {
  data: string | null;
  isLoading: boolean;
  error: Failure | null;
  fetch: () => Promise<void>;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetch: async () => {
    set({ data: null, isLoading: true, error: null });
    const result = await pageDataService.getSettings();
    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return;
    }
    set({ data: result, isLoading: false, error: null });
  },
}));
