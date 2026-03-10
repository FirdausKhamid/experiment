import { create } from "zustand";
import { regionService } from "@/data/services/regionService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { RegionByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type RegionByIdWithOverrides = RegionByIdDto & {
  featuresOverrideList: { feature_id: number; feature_key: string; feature_description: string; is_allowed: boolean }[];
};

type RegionByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: RegionByIdWithOverrides | null;
  fetchById: (id: string) => Promise<boolean>;
  clear: () => void;
};

export const useRegionByIdStore = create<RegionByIdState>((set) => ({
  isLoading: false,
  error: null,
  originalData: null,
  clear: () => set({ originalData: null }),
  fetchById: async (id: string) => {
    set({ isLoading: true, error: null, originalData: null });
    const [regionResult, overridesResult] = await Promise.all([
      regionService.fetchById(id),
      featureOverridesService.getOverrides("region", id),
    ]);
    if (isFailure(regionResult)) {
      set({ isLoading: false, error: regionResult });
      return false;
    }
    const featuresOverrideList = isFailure(overridesResult) ? [] : overridesResult;
    set({
      isLoading: false,
      error: null,
      originalData: { ...regionResult, featuresOverrideList },
    });
    return true;
  },
}));
