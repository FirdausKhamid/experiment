/** Single override entry in response (target implied by parent key) */
export class FeatureOverrideItemDto {
  id!: number;
  targetType!: 'user' | 'region' | 'group';
  targetId!: string;
  targetLabel!: string;
  isEnabled!: boolean;
  createdAt!: string;
}

export class FeatureDto {
  id!: number;
  key!: string;
  isEnabled!: boolean;
  description?: string | null;
  updatedAt!: string;
  userOverrides!: FeatureOverrideItemDto[];
  regionOverrides!: FeatureOverrideItemDto[];
  groupOverrides!: FeatureOverrideItemDto[];
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
  userOverrides?: string[];
  regionOverrides?: string[];
  groupOverrides?: string[];
}
