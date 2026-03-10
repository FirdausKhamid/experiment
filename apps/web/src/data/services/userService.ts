import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { PaginatedUserDto } from '@experiment/shared';
import { PaginatedUserSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

export const userService = {
  findAllPaginate: async (
    page: number,
    limit: number,
  ): Promise<PaginatedUserDto | Failure> => {
    try {
      const response = await api.get<PaginatedUserDto>(
        API_ENDPOINTS.USERS.FIND_ALL_PAGINATE,
        { params: { page, limit } },
      );
      return PaginatedUserSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
