import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto, PaginatedUserDto } from '@experiment/shared';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAllPaginate(
    page: number,
    limit: number,
  ): Promise<PaginatedUserDto> {
    const [items, total] = await this.usersRepository.findAndCount({
      relations: ['group', 'region'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items: items.map((u) => ({
        id: u.id,
        username: u.username,
        groupId: u.group?.id ?? null,
        regionId: u.region?.id ?? null,
        createdAt: u.createdAt.toISOString(),
      })),
      total,
      page,
      limit,
    };
  }

  async findOneByIdWithGroup(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['group'],
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.findOneByUsername(registerDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    const newUser = this.usersRepository.create({
      username: registerDto.username,
      passwordHash,
    });

    return this.usersRepository.save(newUser);
  }
}
