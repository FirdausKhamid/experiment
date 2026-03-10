import { Body, Controller, Get, NotFoundException, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureDto, PaginatedFeatureDto, UpdateFeatureDto } from './dto/feature.dto';

@ApiTags('features')
@Controller('features')
export class FeatureFlagsController {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

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

