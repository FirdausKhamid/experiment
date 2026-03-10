import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { PaginatedRegionDto, RegionByIdDto } from '@experiment/shared';
import { PaginatedRegionSchema, RegionByIdSchema } from '@experiment/shared';
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
  fetchById: async (id: string): Promise<RegionByIdDto | Failure> => {
    try {
      const response = await api.get<RegionByIdDto>(
        API_ENDPOINTS.REGIONS.FETCH_BY_ID(id),
      );
      return RegionByIdSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
