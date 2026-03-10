import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../entities/feature.entity';
import { Override, OverrideTargetType } from '../entities/override.entity';
import { PaginatedFeatureDto } from '@experiment/shared';

type FeatureContext = {
  userId: string;
  groupId?: string;
};

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(Override)
    private readonly overrideRepository: Repository<Override>,
  ) {}

  /**
   * Evaluate a single feature flag with precedence:
   * 1) User override
   * 2) Group override
   * 3) Global feature default
   */
  async isEnabled(featureKey: string, context: FeatureContext): Promise<boolean> {
    const feature = await this.featureRepository.findOne({
      where: { key: featureKey },
    });

    if (!feature) {
      return false;
    }

    const featureRelation = { id: feature.id };

    const userOverride = await this.overrideRepository.findOne({
      where: {
        feature: featureRelation,
        targetType: OverrideTargetType.USER,
        targetId: context.userId,
      },
    });

    if (userOverride) {
      return userOverride.isEnabled;
    }

    if (context.groupId) {
      const groupOverride = await this.overrideRepository.findOne({
        where: {
          feature: featureRelation,
          targetType: OverrideTargetType.GROUP,
          targetId: context.groupId,
        },
      });

      if (groupOverride) {
        return groupOverride.isEnabled;
      }
    }

    return feature.isEnabled ?? false;
  }

  /**
   * Convenience helper: compute all enabled feature keys for a user.
   * This can be used at login time to return a static feature snapshot
   * to the client if desired.
   */
  async getEnabledFeatureKeysForUser(
    context: FeatureContext,
  ): Promise<string[]> {
    const features = await this.featureRepository.find();
    const enabled: string[] = [];

    for (const feature of features) {
      const isOn = await this.isEnabled(feature.key, context);
      if (isOn) {
        enabled.push(feature.key);
      }
    }

    return enabled;
  }

  async findAllPaginate(page: number, limit: number): Promise<PaginatedFeatureDto> {
    const [items, total] = await this.featureRepository.findAndCount({
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: items.map((f) => ({
        id: f.id,
        key: f.key,
        isEnabled: f.isEnabled,
        description: f.description ?? null,
        updatedAt: f.updatedAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }
}

