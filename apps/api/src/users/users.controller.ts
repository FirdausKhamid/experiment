import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PaginatedUserDto } from '@experiment/shared';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all-paginate')
  @ApiOperation({ summary: 'List all users with pagination' })
  @ApiOkResponse({ description: 'Paginated list of users (no password)' })
  async findAllPaginate(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedUserDto> {
    const pageNumber = Number(page) || 1;
    const pageSize = Number(limit) || 10;
    return this.usersService.findAllPaginate(pageNumber, pageSize);
  }
}
