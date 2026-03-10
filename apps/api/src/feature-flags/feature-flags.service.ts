import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Feature } from '../entities/feature.entity';
import { Group } from '../entities/group.entity';
import { Override, OverrideTargetType } from '../entities/override.entity';
import { Region } from '../entities/region.entity';
import { User } from '../entities/user.entity';
import {
  FeatureDto,
  FeatureOverrideItemDto,
  PaginatedFeatureDto,
  UpdateFeatureDto,
} from './dto/feature.dto';

type FeatureContext = {
  userId: string;
  groupId?: string;
};

type TargetLabelMaps = {
  user: Map<string, string>;
  region: Map<string, string>;
  group: Map<string, string>;
};

@Injectable()
export class FeatureFlagsService {
  constructor(
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(Override)
    private readonly overrideRepository: Repository<Override>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
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
        userOverrides: [],
        regionOverrides: [],
        groupOverrides: [],
      })),
      total,
      page,
      limit,
    };
  }

  private async loadTargetLabelMaps(overrides: Override[]): Promise<TargetLabelMaps> {
    const userIds = [...new Set(overrides.filter((o) => o.targetType === OverrideTargetType.USER).map((o) => o.targetId))];
    const groupIds = [...new Set(overrides.filter((o) => o.targetType === OverrideTargetType.GROUP).map((o) => o.targetId))];
    const regionIds = [...new Set(overrides.filter((o) => o.targetType === OverrideTargetType.REGION).map((o) => o.targetId))];

    const [users, groups, regions] = await Promise.all([
      userIds.length ? this.userRepository.find({ where: { id: In(userIds) }, select: ['id', 'username'] }) : [],
      groupIds.length ? this.groupRepository.find({ where: { id: In(groupIds) }, select: ['id', 'name'] }) : [],
      regionIds.length ? this.regionRepository.find({ where: { id: In(regionIds) }, select: ['id', 'name'] }) : [],
    ]);

    return {
      user: new Map(users.map((u) => [u.id, u.username])),
      region: new Map(regions.map((r) => [r.id, r.name])),
      group: new Map(groups.map((g) => [g.id, g.name])),
    };
  }

  private mapOverridesToDto(
    overrides: Override[] | undefined,
    labels: TargetLabelMaps,
  ): {
    userOverrides: FeatureOverrideItemDto[];
    regionOverrides: FeatureOverrideItemDto[];
    groupOverrides: FeatureOverrideItemDto[];
  } {
    const toItem = (o: Override): FeatureOverrideItemDto => {
      const targetType = o.targetType as 'user' | 'region' | 'group';
      const labelMap = labels[targetType];
      const targetLabel = labelMap?.get(o.targetId) ?? o.targetId;
      return {
        id: o.id,
        targetType,
        targetId: o.targetId,
        targetLabel,
        isEnabled: o.isEnabled,
        createdAt: o.createdAt.toISOString(),
      };
    };
    const list = overrides ?? [];
    return {
      userOverrides: list.filter((o) => o.targetType === OverrideTargetType.USER).map(toItem),
      regionOverrides: list.filter((o) => o.targetType === OverrideTargetType.REGION).map(toItem),
      groupOverrides: list.filter((o) => o.targetType === OverrideTargetType.GROUP).map(toItem),
    };
  }

  async findOneById(id: number): Promise<FeatureDto | null> {
    const feature = await this.featureRepository.findOne({
      where: { id },
      relations: { overrides: true },
    });
    if (!feature) return null;
    const labels = feature.overrides?.length
      ? await this.loadTargetLabelMaps(feature.overrides)
      : { user: new Map(), region: new Map(), group: new Map() };
    return {
      id: feature.id,
      key: feature.key,
      isEnabled: feature.isEnabled,
      description: feature.description ?? null,
      updatedAt: feature.updatedAt.toISOString(),
      ...this.mapOverridesToDto(feature.overrides, labels),
    };
  }

  async update(id: number, payload: UpdateFeatureDto): Promise<FeatureDto | null> {
    const feature = await this.featureRepository.findOne({ where: { id } });
    if (!feature) return null;

    feature.key = payload.key;
    feature.isEnabled = payload.isEnabled;
    feature.description = payload.description ?? feature.description;

    const saved = await this.featureRepository.save(feature);

    const defaultEnabled = saved.isEnabled;
    const featureRef = { id: saved.id };

    if (payload.userOverrides !== undefined) {
      await this.overrideRepository.delete({
        feature: featureRef,
        targetType: OverrideTargetType.USER,
      });
      for (const targetId of payload.userOverrides) {
        await this.overrideRepository.save({
          feature: saved,
          targetType: OverrideTargetType.USER,
          targetId,
          isEnabled: defaultEnabled,
        });
      }
    }
    if (payload.regionOverrides !== undefined) {
      await this.overrideRepository.delete({
        feature: featureRef,
        targetType: OverrideTargetType.REGION,
      });
      for (const targetId of payload.regionOverrides) {
        await this.overrideRepository.save({
          feature: saved,
          targetType: OverrideTargetType.REGION,
          targetId,
          isEnabled: defaultEnabled,
        });
      }
    }
    if (payload.groupOverrides !== undefined) {
      await this.overrideRepository.delete({
        feature: featureRef,
        targetType: OverrideTargetType.GROUP,
      });
      for (const targetId of payload.groupOverrides) {
        await this.overrideRepository.save({
          feature: saved,
          targetType: OverrideTargetType.GROUP,
          targetId,
          isEnabled: defaultEnabled,
        });
      }
    }

    const withOverrides = await this.featureRepository.findOne({
      where: { id: saved.id },
      relations: { overrides: true },
    });
    const labels = withOverrides!.overrides?.length
      ? await this.loadTargetLabelMaps(withOverrides!.overrides)
      : { user: new Map(), region: new Map(), group: new Map() };
    return {
      id: withOverrides!.id,
      key: withOverrides!.key,
      isEnabled: withOverrides!.isEnabled,
      description: withOverrides!.description ?? null,
      updatedAt: withOverrides!.updatedAt.toISOString(),
      ...this.mapOverridesToDto(withOverrides!.overrides, labels),
    };
  }
}

