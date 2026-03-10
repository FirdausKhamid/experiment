import { create } from "zustand";
import { groupService } from "@/data/services/groupService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { GroupByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type GroupByIdWithOverrides = GroupByIdDto & {
  featuresOverrideList: { feature_id: number; feature_key: string; feature_description: string; is_allowed: boolean }[];
};

type RoleByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: GroupByIdWithOverrides | null;
  fetchById: (id: string) => Promise<boolean>;
  clear: () => void;
};

export const useRoleByIdStore = create<RoleByIdState>((set) => ({
  isLoading: false,
  error: null,
  originalData: null,
  clear: () => set({ originalData: null }),
  fetchById: async (id: string) => {
    set({ isLoading: true, error: null, originalData: null });
    const [groupResult, overridesResult] = await Promise.all([
      groupService.fetchById(id),
      featureOverridesService.getOverrides("group", id),
    ]);
    if (isFailure(groupResult)) {
      set({ isLoading: false, error: groupResult });
      return false;
    }
    const featuresOverrideList = isFailure(overridesResult) ? [] : overridesResult;
    set({
      isLoading: false,
      error: null,
      originalData: { ...groupResult, featuresOverrideList },
    });
    return true;
  },
}));
