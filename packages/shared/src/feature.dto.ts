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

