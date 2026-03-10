import { z } from 'zod';
import { FeatureSchema } from './feature.dto';

// Fields allowed to be updated for a feature.
// We reuse FeatureSchema but drop id/updatedAt and keep key/isEnabled required.
export const UpdateFeatureSchema = FeatureSchema.pick({
  key: true,
  isEnabled: true,
  description: true,
}).omit({
  // nothing omitted here because id/updatedAt were not picked
});

export type UpdateFeatureDto = z.infer<typeof UpdateFeatureSchema>;

