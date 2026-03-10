import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureDto, PaginatedFeatureDto } from '@experiment/shared';

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
}

