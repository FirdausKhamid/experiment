import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeatureOverridePatchByTargetSchema } from '@experiment/shared';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureOverrideListService } from './feature-override-list.service';
import { FeatureDto, PaginatedFeatureDto, UpdateFeatureDto } from './dto/feature.dto';
import { OverrideTargetType } from '../entities/override.entity';

@ApiTags('features')
@Controller('features')
export class FeatureFlagsController {
  constructor(
    private readonly featureFlagsService: FeatureFlagsService,
    private readonly featureOverrideListService: FeatureOverrideListService,
  ) {}

  @Get('overrides')
  @ApiOperation({ summary: 'Get feature override list for a target (query: targetType, targetId)' })
  @ApiOkResponse({ description: 'Full list of features with is_allowed per target' })
  async getOverrides(
    @Query('targetType') targetType: string,
    @Query('targetId') targetId: string,
  ) {
    if (!targetType || !targetId?.trim()) {
      throw new BadRequestException('targetType and targetId are required');
    }
    const type = targetType as OverrideTargetType;
    if (type !== OverrideTargetType.USER && type !== OverrideTargetType.REGION && type !== OverrideTargetType.GROUP) {
      throw new BadRequestException('targetType must be user, region, or group');
    }
    return this.featureOverrideListService.getFeaturesOverrideListForTarget(type, targetId.trim());
  }

  @Patch('overrides')
  @ApiOperation({ summary: 'Patch feature overrides for a target (body: targetType, targetId, featureOverrides)' })
  @ApiOkResponse({ description: 'Updated override list for the target' })
  async patchOverrides(@Body() body: unknown) {
    const parsed = FeatureOverridePatchByTargetSchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }
    const targetType = parsed.data.targetType as OverrideTargetType;
    return this.featureOverrideListService.patchOverridesForTarget(
      targetType,
      parsed.data.targetId,
      { featureOverrides: parsed.data.featureOverrides },
    );
  }

  @Get('find-all-paginate')
  @ApiOperation({ summary: 'List all features with simple pagination' })
  @ApiOkResponse({ description: 'Paginated list of feature flags' })
  async findAllPaginate(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedFeatureDto> {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    return this.featureFlagsService.findAllPaginate(pageNumber, pageSize);
  }

  @Get('fetch-by-id/:id')
  @ApiOperation({ summary: 'Fetch a single feature by id' })
  @ApiOkResponse({ description: 'Single feature' })
  async fetchById(@Param('id') id: string): Promise<FeatureDto> {
    const numericId = Number(id);
    const feature = await this.featureFlagsService.findOneById(numericId);
    if (!numericId || !feature) {
      throw new NotFoundException('Feature not found');
    }
    return feature;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a feature by id' })
  @ApiOkResponse({ description: 'Updated feature' })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateFeatureDto,
  ): Promise<FeatureDto> {
    const numericId = Number(id);
    if (!numericId) {
      throw new NotFoundException('Feature not found');
    }
    const updated = await this.featureFlagsService.update(numericId, body);
    if (!updated) {
      throw new NotFoundException('Feature not found');
    }
    return updated;
  }
}

