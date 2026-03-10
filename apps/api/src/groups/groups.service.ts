import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { PaginatedGroupDto, GroupByIdDto } from '@experiment/shared';
import { FeatureOverrideListService } from '../feature-flags/feature-override-list.service';
import { OverrideTargetType } from '../entities/override.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly featureOverrideListService: FeatureOverrideListService,
  ) {}

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginatedGroupDto> {
    const [items, total] = await this.groupRepository.findAndCount({
      order: { id: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: items.map((g) => ({
        id: g.id,
        name: g.name,
        createdAt: g.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }

  async findOneById(id: string): Promise<GroupByIdDto | null> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) return null;
    const featuresOverrideList =
      await this.featureOverrideListService.getFeaturesOverrideListForTarget(
        OverrideTargetType.GROUP,
        group.id,
      );
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt.toISOString(),
      featuresOverrideList,
    } as GroupByIdDto;
  }
}
