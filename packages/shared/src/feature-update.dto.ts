import { z } from 'zod';
import { FeatureSchema } from './feature.dto';

const overrideIdsSchema = z.array(z.string().min(1, 'Override id is required')).optional();

// Fields allowed to be updated for a feature.
export const UpdateFeatureSchema = FeatureSchema.pick({
  key: true,
  isEnabled: true,
  description: true,
}).extend({
  userOverrides: overrideIdsSchema,
  regionOverrides: overrideIdsSchema,
  groupOverrides: overrideIdsSchema,
});

export type UpdateFeatureDto = z.infer<typeof UpdateFeatureSchema>;

