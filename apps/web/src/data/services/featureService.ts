import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type {
  FeatureDto,
  PaginatedFeatureDto,
  UpdateFeatureDto,
} from '@experiment/shared';
import {
  FeatureSchema,
  PaginatedFeatureSchema,
} from '@experiment/shared';
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
  fetchById: async (id: number): Promise<FeatureDto | Failure> => {
    try {
      const response = await api.get<FeatureDto>(
        API_ENDPOINTS.FEATURES.FETCH_BY_ID(id),
      );
      return FeatureSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },

  update: async (
    id: number,
    payload: UpdateFeatureDto,
  ): Promise<FeatureDto | Failure> => {
    try {
      const response = await api.put<FeatureDto>(
        API_ENDPOINTS.FEATURES.UPDATE(id),
        payload,
      );
      return FeatureSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};

