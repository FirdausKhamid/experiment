import { create } from "zustand";
import { featureService } from "@/data/services/featureService";
import type { FeatureDto, PaginatedFeatureDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type FeatureState = {
  items: FeatureDto[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: Failure | null;
  fetchPage: (page?: number, limit?: number) => Promise<void>;
};

export const useFeatureStore = create<FeatureState>((set, get) => ({
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,

  fetchPage: async (page, limit) => {
    const current = get();
    const nextPage = page ?? current.page;
    const nextLimit = limit ?? current.limit;

    set({ isLoading: true, error: null });
    const result = await featureService.findAllPaginate(nextPage, nextLimit);

    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return;
    }

    const payload = result as PaginatedFeatureDto;

    set({
      isLoading: false,
      error: null,
      items: payload.items,
      total: payload.total,
      page: payload.page,
      limit: payload.limit,
    });
  },
}));

