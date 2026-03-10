import { create } from "zustand";
import { regionService } from "@/data/services/regionService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { RegionByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type RegionByIdWithOverrides = RegionByIdDto;

type PatchPayload = {
  targetType: "user" | "region" | "group";
  targetId: string;
  featureOverrides: { feature_id: number; enabled: boolean | "default" }[];
};

type RegionByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: RegionByIdWithOverrides | null;
  isPatching: boolean;
  patchError: Failure | null;
  fetchById: (id: string) => Promise<boolean>;
  patchOverrides: (payload: PatchPayload) => Promise<boolean>;
  clear: () => void;
};

export const useRegionByIdStore = create<RegionByIdState>((set, get) => ({
  isLoading: false,
  error: null,
  originalData: null,
  isPatching: false,
  patchError: null,
  clear: () => set({ originalData: null, patchError: null }),
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
  patchOverrides: async (payload: PatchPayload) => {
    set({ isPatching: true, patchError: null });
    const result = await featureOverridesService.patchOverrides(payload);
    if (isFailure(result)) {
      set({ isPatching: false, patchError: result });
      return false;
    }
    set({ isPatching: false, patchError: null });
    const data = get().originalData;
    if (data) {
      set({ originalData: { ...data, featuresOverrideList: result } });
    }
    return true;
  },
}));
