import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Feature } from '../entities/feature.entity';
import { Override, OverrideTargetType } from '../entities/override.entity';
import type {
  FeatureOverridePatchDto,
  FeatureOverridePatchItem,
} from '@experiment/shared';

export type FeatureOverrideListItem = {
  feature_id: number;
  feature_key: string;
  feature_description: string;
  is_allowed: boolean;
};

@Injectable()
export class FeatureOverrideListService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(Override)
    private readonly overrideRepository: Repository<Override>,
  ) {}

  /**
   * Returns the full list of all features as an override list for the given target.
   * Never trims: every feature in the DB is included. For each feature, is_allowed =
   * override.isEnabled if an override exists, else feature.isEnabled (global default).
   */
  async getFeaturesOverrideListForTarget(
    targetType: OverrideTargetType,
    targetId: string,
  ): Promise<FeatureOverrideListItem[]> {
    const features = await this.featureRepository.find({
      order: { id: 'ASC' },
    });
    if (!features.length) return [];

    const overrides = await this.overrideRepository.find({
      where: { targetType, targetId },
      relations: ['feature'],
    });
    const overrideByFeatureId = new Map(
      overrides.map((o) => [o.feature.id, o.isEnabled]),
    );

    return features.map((f) => ({
      feature_id: f.id,
      feature_key: f.key,
      feature_description: f.description ?? '',
      is_allowed: overrideByFeatureId.has(f.id)
        ? !!overrideByFeatureId.get(f.id)
        : !!f.isEnabled,
    }));
  }
  /**
   * PATCH overrides for a target: only the given list of features are evaluated and updated.
   * - enabled: true → register override (is_enabled = true)
   * - enabled: false → register override (is_enabled = false)
   * - enabled: 'default' → delete override row (target falls back to global feature default)
   * Runs in a single transaction.
   */
  async patchOverridesForTarget(
    targetType: OverrideTargetType,
    targetId: string,
    payload: FeatureOverridePatchDto,
  ): Promise<FeatureOverrideListItem[]> {
    if (!payload.featureOverrides?.length) {
      return this.getFeaturesOverrideListForTarget(targetType, targetId);
    }

    await this.dataSource.transaction(async (manager) => {
      const overrideRepo = manager.getRepository(Override);
      const featureRepo = manager.getRepository(Feature);
      const featureIds = [
        ...new Set(
          payload.featureOverrides.map(
            (i: FeatureOverridePatchItem) => i.feature_id,
          ),
        ),
      ];
      const features = await featureRepo.find({
        where: { id: In(featureIds) },
      });
      const featureById = new Map(features.map((f) => [f.id, f]));

      for (const item of payload.featureOverrides) {
        const feature = featureById.get(item.feature_id);
        if (!feature) continue;

        if (item.enabled === 'default') {
          await overrideRepo.delete({
            feature: { id: feature.id },
            targetType,
            targetId,
          });
          continue;
        }

        const existing = await overrideRepo.findOne({
          where: { feature: { id: feature.id }, targetType, targetId },
        });
        if (existing) {
          existing.isEnabled = item.enabled;
          await overrideRepo.save(existing);
        } else {
          await overrideRepo.save({
            feature,
            targetType,
            targetId,
            isEnabled: item.enabled,
          });
        }
      }
    });

    return this.getFeaturesOverrideListForTarget(targetType, targetId);
  }
}
