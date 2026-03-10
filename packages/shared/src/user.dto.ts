import { z } from 'zod';
import { FeatureOverrideItemSchema } from './feature.dto';

/** User response (no password). */
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  groupId: z.string().nullable().optional(),
  regionId: z.string().nullable().optional(),
  createdAt: z.string(),
});
export type UserDto = z.infer<typeof UserSchema>;

/** User by id response (includes features override list). */
export const UserByIdSchema = UserSchema.extend({
  featuresOverrideList: z.array(FeatureOverrideItemSchema),
});
export type UserByIdDto = z.infer<typeof UserByIdSchema>;

export const PaginatedUserSchema = z.object({
  items: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedUserDto = z.infer<typeof PaginatedUserSchema>;
