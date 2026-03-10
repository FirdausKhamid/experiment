import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { PaginatedGroupDto, GroupByIdDto } from '@experiment/shared';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('find-all-paginate')
  @ApiOperation({ summary: 'List all groups (roles) with pagination' })
  @ApiOkResponse({ description: 'Paginated list of groups' })
  async findAllPaginate(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedGroupDto> {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    return this.groupsService.findAllPaginate(pageNumber, pageSize);
  }

  @Get('fetch-by-id/:id')
  @ApiOperation({ summary: 'Fetch a single group (role) by id with features override list' })
  @ApiOkResponse({ description: 'Group with featuresOverrideList' })
  async fetchById(@Param('id') id: string): Promise<GroupByIdDto> {
    const group = await this.groupsService.findOneById(id);
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }
}
