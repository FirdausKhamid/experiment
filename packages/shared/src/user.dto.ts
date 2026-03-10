import { z } from 'zod';

/** User response (no password). */
export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  groupId: z.string().nullable().optional(),
  regionId: z.string().nullable().optional(),
  createdAt: z.string(),
});
export type UserDto = z.infer<typeof UserSchema>;

export const PaginatedUserSchema = z.object({
  items: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedUserDto = z.infer<typeof PaginatedUserSchema>;
