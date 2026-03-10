import { create } from "zustand";
import { featureService } from "@/data/services/featureService";
import type { FeatureDto, UpdateFeatureDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type UpdateFeatureState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: FeatureDto | null;
  update: (id: number, payload: UpdateFeatureDto) => Promise<boolean>;
  fetchById: (id: number) => Promise<boolean>;
  clear: () => void;
};

export const useUpdateFeatureStore = create<UpdateFeatureState>((set) => ({
  isLoading: false,
  error: null,
  originalData: null,
  clear: () => set({ originalData: null }),
  fetchById: async (id: number) => {
    set({ isLoading: true, error: null, originalData: null });
    const result = await featureService.fetchById(id);
    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return false;
    }
    set({
      isLoading: false,
      error: null,
      originalData: result,
    });
    return true;
  },

  update: async (id, payload) => {
    set({ isLoading: true, error: null, originalData: null });
    const result = await featureService.update(id, payload);

    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return false;
    }

    set({
      isLoading: false,
      error: null,
      originalData: null,
    });
    return true;
  },
}));
