import { z } from 'zod';

export const RegionSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
});
export type RegionDto = z.infer<typeof RegionSchema>;

export const PaginatedRegionSchema = z.object({
  items: z.array(RegionSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type PaginatedRegionDto = z.infer<typeof PaginatedRegionSchema>;
