import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../entities/feature.entity';
import { Override, OverrideTargetType } from '../entities/override.entity';

export type FeatureOverrideListItem = {
  feature_id: number;
  feature_key: string;
  feature_description: string;
  is_allowed: boolean;
};

@Injectable()
export class FeatureOverrideListService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(Override)
    private readonly overrideRepository: Repository<Override>,
  ) {}

  /**
   * Returns all features as an override list for the given target (user, region, or group).
   * For each feature, is_allowed = override.isEnabled if an override exists, else feature.isEnabled.
   */
  async getFeaturesOverrideListForTarget(
    targetType: OverrideTargetType,
    targetId: string,
  ): Promise<FeatureOverrideListItem[]> {
    const features = await this.featureRepository.find({ order: { id: 'ASC' } });
    if (!features.length) return [];

    const overrides = await this.overrideRepository.find({
      where: { targetType, targetId },
      relations: ['feature'],
    });
    const overrideByFeatureId = new Map(overrides.map((o) => [o.feature.id, o.isEnabled]));

    return features.map((f) => ({
      feature_id: f.id,
      feature_key: f.key,
      feature_description: f.description ?? '',
      is_allowed: overrideByFeatureId.has(f.id)
        ? !!overrideByFeatureId.get(f.id)
        : !!f.isEnabled,
    }));
  }
}
