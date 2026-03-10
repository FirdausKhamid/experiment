import { z } from 'zod';
import { FeatureOverrideItemSchema } from './feature.dto';

/** Group (role) response. */
export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
export type GroupDto = z.infer<typeof GroupSchema>;

/** Group by id response (includes features override list). */
export const GroupByIdSchema = GroupSchema.extend({
  featuresOverrideList: z.array(FeatureOverrideItemSchema),
});
export type GroupByIdDto = z.infer<typeof GroupByIdSchema>;

export const PaginatedGroupSchema = z.object({
  items: z.array(GroupSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedGroupDto = z.infer<typeof PaginatedGroupSchema>;
