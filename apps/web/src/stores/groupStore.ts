import { create } from "zustand";
import { groupService } from "@/data/services/groupService";
import type { GroupDto, PaginatedGroupDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { isFailure } from "@/utils/error";

type GroupState = {
  items: GroupDto[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: Failure | null;
  fetchPage: (page?: number, limit?: number) => Promise<void>;
};

export const useGroupStore = create<GroupState>((set, get) => ({
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

    set({ items: [], isLoading: true, error: null });
    const result = await groupService.findAllPaginate(nextPage, nextLimit);

    if (isFailure(result)) {
      set({ isLoading: false, error: result });
      return;
    }

    const payload = result as PaginatedGroupDto;
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
