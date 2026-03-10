import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '../entities/feature.entity';
import { Group } from '../entities/group.entity';
import { Override } from '../entities/override.entity';
import { Region } from '../entities/region.entity';
import { User } from '../entities/user.entity';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagsController } from './feature-flags.controller';
import { FeatureOverrideListModule } from './feature-override-list.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feature, Override, User, Group, Region]),
    FeatureOverrideListModule,
    UsersModule,
  ],
  controllers: [FeatureFlagsController],
  providers: [FeatureFlagsService],
  exports: [FeatureFlagsService],
})
export class FeatureFlagsModule {}

