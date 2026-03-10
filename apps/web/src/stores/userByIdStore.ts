import { create } from "zustand";
import { userService } from "@/data/services/userService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { UserByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type UserByIdWithOverrides = UserByIdDto;

type PatchPayload = {
  targetType: "user" | "region" | "group";
  targetId: string;
  featureOverrides: { feature_id: number; enabled: boolean | "default" }[];
};

type UserByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: UserByIdWithOverrides | null;
  isPatching: boolean;
  patchError: Failure | null;
  fetchById: (id: string) => Promise<boolean>;
  patchOverrides: (payload: PatchPayload) => Promise<boolean>;
  clear: () => void;
};

export const useUserByIdStore = create<UserByIdState>((set, get) => ({
  isLoading: false,
  error: null,
  originalData: null,
  isPatching: false,
  patchError: null,
  clear: () => set({ originalData: null, patchError: null }),
  fetchById: async (id: string) => {
    set({ isLoading: true, error: null, originalData: null });
    const [userResult, overridesResult] = await Promise.all([
      userService.fetchById(id),
      featureOverridesService.getOverrides("user", id),
    ]);
    if (isFailure(userResult)) {
      set({ isLoading: false, error: userResult });
      return false;
    }
    const featuresOverrideList = isFailure(overridesResult) ? [] : overridesResult;
    set({
      isLoading: false,
      error: null,
      originalData: { ...userResult, featuresOverrideList },
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
