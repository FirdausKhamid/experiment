import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '../entities/feature.entity';
import { Override } from '../entities/override.entity';
import { FeatureFlagsService } from './feature-flags.service';
import { FeatureFlagGuard } from './feature-flag.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Override]), UsersModule],
  providers: [FeatureFlagsService, FeatureFlagGuard],
  exports: [FeatureFlagsService, FeatureFlagGuard],
})
export class FeatureFlagsModule {}

