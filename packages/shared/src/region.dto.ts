import { z } from 'zod';
import { FeatureOverrideItemSchema } from './feature.dto';

export const RegionSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
export type RegionDto = z.infer<typeof RegionSchema>;

/** Region by id response (includes features override list). */
export const RegionByIdSchema = RegionSchema.extend({
  featuresOverrideList: z.array(FeatureOverrideItemSchema),
});
export type RegionByIdDto = z.infer<typeof RegionByIdSchema>;

export const PaginatedRegionSchema = z.object({
  items: z.array(RegionSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedRegionDto = z.infer<typeof PaginatedRegionSchema>;
