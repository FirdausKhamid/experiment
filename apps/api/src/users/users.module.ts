import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FeatureOverrideListModule } from '../feature-flags/feature-override-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FeatureOverrideListModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
