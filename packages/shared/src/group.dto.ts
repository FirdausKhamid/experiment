import { z } from 'zod';

/** Group (role) response. */
export const GroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
export type GroupDto = z.infer<typeof GroupSchema>;

export const PaginatedGroupSchema = z.object({
  items: z.array(GroupSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedGroupDto = z.infer<typeof PaginatedGroupSchema>;
