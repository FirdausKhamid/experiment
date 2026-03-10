import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { PaginatedGroupDto, GroupByIdDto } from '@experiment/shared';
import { PaginatedGroupSchema, GroupByIdSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

export const groupService = {
  findAllPaginate: async (
    page: number,
    limit: number,
  ): Promise<PaginatedGroupDto | Failure> => {
    try {
      const response = await api.get<PaginatedGroupDto>(
        API_ENDPOINTS.GROUPS.FIND_ALL_PAGINATE,
        { params: { page, limit } },
      );
      return PaginatedGroupSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
  fetchById: async (id: string): Promise<GroupByIdDto | Failure> => {
    try {
      const response = await api.get<GroupByIdDto>(
        API_ENDPOINTS.GROUPS.FETCH_BY_ID(id),
      );
      return GroupByIdSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
