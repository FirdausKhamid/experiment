import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { PaginatedRegionDto } from '@experiment/shared';
import { PaginatedRegionSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

export const regionService = {
  findAllPaginate: async (
    page: number,
    limit: number,
  ): Promise<PaginatedRegionDto | Failure> => {
    try {
      const response = await api.get<PaginatedRegionDto>(
        API_ENDPOINTS.REGIONS.FIND_ALL_PAGINATE,
        { params: { page, limit } },
      );
      return PaginatedRegionSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
