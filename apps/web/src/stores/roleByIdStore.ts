import { create } from "zustand";
import { groupService } from "@/data/services/groupService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { GroupByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type GroupByIdWithOverrides = GroupByIdDto;

type PatchPayload = {
  targetType: "user" | "region" | "group";
  targetId: string;
  featureOverrides: { feature_id: number; enabled: boolean | "default" }[];
};

type RoleByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: GroupByIdWithOverrides | null;
  isPatching: boolean;
  patchError: Failure | null;
  fetchById: (id: string) => Promise<boolean>;
  patchOverrides: (payload: PatchPayload) => Promise<boolean>;
  clear: () => void;
};

export const useRoleByIdStore = create<RoleByIdState>((set, get) => ({
  isLoading: false,
  error: null,
  originalData: null,
  isPatching: false,
  patchError: null,
  clear: () => set({ originalData: null, patchError: null }),
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
