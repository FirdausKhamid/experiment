import { create } from "zustand";
import { pageDataService } from "@/data/services/pageDataService";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type DashboardState = {
  data: string | null;
  isLoading: boolean;
  error: Failure | null;
  fetch: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetch: async () => {
    set({ isLoading: true, error: null });
    const result = await pageDataService.getDashboard();
    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return;
    }
    set({ data: result, isLoading: false, error: null });
  },
}));
