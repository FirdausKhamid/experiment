import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from '../entities/region.entity';
import { PaginatedRegionDto, RegionByIdDto } from '@experiment/shared';
import { FeatureOverrideListService } from '../feature-flags/feature-override-list.service';
import { OverrideTargetType } from '../entities/override.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
    private readonly featureOverrideListService: FeatureOverrideListService,
  ) {}

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginatedRegionDto> {
    const [items, total] = await this.regionRepository.findAndCount({
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: items.map((r) => ({
        id: r.id,
        name: r.name,
        createdAt: r.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }

  async findOneById(id: string): Promise<RegionByIdDto | null> {
    const region = await this.regionRepository.findOne({ where: { id } });
    if (!region) return null;
    const featuresOverrideList =
      await this.featureOverrideListService.getFeaturesOverrideListForTarget(
        OverrideTargetType.REGION,
        region.id,
      );
    return {
      id: region.id,
      name: region.name,
      createdAt: region.createdAt.toISOString(),
      featuresOverrideList,
    };
  }
}
