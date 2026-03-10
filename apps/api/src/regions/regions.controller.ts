import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { PaginatedRegionDto } from '@experiment/shared';

@ApiTags('regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get('find-all-paginate')
  @ApiOperation({ summary: 'List all regions with pagination' })
  @ApiOkResponse({ description: 'Paginated list of regions' })
  async findAllPaginate(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedRegionDto> {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    return this.regionsService.findAllPaginate(pageNumber, pageSize);
  }
}
