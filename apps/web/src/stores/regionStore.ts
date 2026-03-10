import { create } from "zustand";
import { regionService } from "@/data/services/regionService";
import type { RegionDto, PaginatedRegionDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type RegionState = {
  items: RegionDto[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: Failure | null;
  fetchPage: (page?: number, limit?: number) => Promise<void>;
};

export const useRegionStore = create<RegionState>((set, get) => ({
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
    const result = await regionService.findAllPaginate(nextPage, nextLimit);

    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return;
    }

    const payload = result as PaginatedRegionDto;
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
