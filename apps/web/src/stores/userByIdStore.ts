import { create } from "zustand";
import { userService } from "@/data/services/userService";
import { featureOverridesService } from "@/data/services/featureOverridesService";
import type { UserByIdDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

export type UserByIdWithOverrides = UserByIdDto & {
  featuresOverrideList: { feature_id: number; feature_key: string; feature_description: string; is_allowed: boolean }[];
};

type UserByIdState = {
  isLoading: boolean;
  error: Failure | null;
  originalData: UserByIdWithOverrides | null;
  fetchById: (id: string) => Promise<boolean>;
  clear: () => void;
};

export const useUserByIdStore = create<UserByIdState>((set) => ({
  isLoading: false,
  error: null,
  originalData: null,
  clear: () => set({ originalData: null }),
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
}));
