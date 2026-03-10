import { api } from '../api';
import { API_ENDPOINTS } from '../endpoint';
import type { FeatureOverrideItem, FeatureOverridePatchByTargetDto } from '@experiment/shared';
import { z } from 'zod';
import { FeatureOverrideItemSchema } from '@experiment/shared';
import { Failure, normalizeToFailure } from '../../utils/error';

const OverridesResponseSchema = z.array(FeatureOverrideItemSchema);

/** Target for feature overrides (from shared). */
export type TargetType = FeatureOverridePatchByTargetDto['targetType'];

export const featureOverridesService = {
  getOverrides: async (
    targetType: TargetType,
    targetId: string,
  ): Promise<FeatureOverrideItem[] | Failure> => {
    try {
      const response = await api.get<FeatureOverrideItem[]>(
        API_ENDPOINTS.FEATURES.OVERRIDES,
        { params: { targetType, targetId } },
      );
      return OverridesResponseSchema.parse(response.data);
    } catch (error) {
      return normalizeToFailure(error);
    }
  },
};
