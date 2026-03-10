export class FeatureDto {
  id!: number;
  key!: string;
  isEnabled!: boolean;
  description?: string | null;
  updatedAt!: string;
}

export class PaginatedFeatureDto {
  items!: FeatureDto[];
  total!: number;
  page!: number;
  limit!: number;
}

export class UpdateFeatureDto {
  key!: string;
  isEnabled!: boolean;
  description?: string | null;
}
