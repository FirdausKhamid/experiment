import { z } from 'zod';

export const FeatureSchema = z.object({
  id: z.number().describe('Unique identifier of the feature'),
  key: z.string().describe('Unique key of the feature flag'),
  isEnabled: z.boolean().describe('Whether the feature is enabled by default'),
  description: z.string().nullable().optional().describe('Human-readable description of the feature'),
  updatedAt: z.string().describe('Last update timestamp in ISO format'),
});
export type FeatureDto = z.infer<typeof FeatureSchema>;

export const PaginatedFeatureSchema = z.object({
  items: z.array(FeatureSchema),
  total: z.number().describe('Total number of features'),
  page: z.number().describe('Current page number (1-based)'),
  limit: z.number().describe('Page size'),
});
export type PaginatedFeatureDto = z.infer<typeof PaginatedFeatureSchema>;

/** Single item in a features override list (e.g. for user/region/group fetchById). is_allowed: 'default' when no override record exists. */
export const FeatureOverrideItemSchema = z.object({
  feature_id: z.number(),
  feature_key: z.string(),
  feature_description: z.string(),
  is_allowed: z.union([z.boolean(), z.literal('default')]),
});
export type FeatureOverrideItem = z.infer<typeof FeatureOverrideItemSchema>;


/** Single item for PATCH feature overrides. enabled: "default" = delete override row. */
export const FeatureOverridePatchItemSchema = z.object({
  feature_id: z.number(),
  enabled: z.union([z.boolean(), z.literal('default')]),
});
export type FeatureOverridePatchItem = z.infer<typeof FeatureOverridePatchItemSchema>;

/** Target type for feature overrides (user, region, group). */
export const FeatureOverrideTargetTypeSchema = z.enum(['user', 'region', 'group']);
export type FeatureOverrideTargetType = z.infer<typeof FeatureOverrideTargetTypeSchema>;

/** Body for PATCH /api/features/overrides (targetType + targetId + featureOverrides). */
export const FeatureOverridePatchByTargetSchema = z.object({
  targetType: FeatureOverrideTargetTypeSchema,
  targetId: z.string().min(1),
  featureOverrides: z.array(FeatureOverridePatchItemSchema),
});
export type FeatureOverridePatchByTargetDto = z.infer<typeof FeatureOverridePatchByTargetSchema>;

/** Payload for service layer (list only; target is passed separately). */
export type FeatureOverridePatchDto = Pick<FeatureOverridePatchByTargetDto, 'featureOverrides'>;

