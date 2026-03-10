import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { PaginatedFeatureDto } from '@experiment/shared';
import { PaginatedFeatureSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

export const featureService = {
  findAllPaginate: async (
    page: number,
    limit: number,
  ): Promise<PaginatedFeatureDto | Failure> => {
    try {
      const response = await api.get<PaginatedFeatureDto>(
        API_ENDPOINTS.FEATURES.FIND_ALL_PAGINATE,
        { params: { page, limit } },
      );
      return PaginatedFeatureSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};

