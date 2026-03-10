import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from '../entities/feature.entity';
import { Override } from '../entities/override.entity';
import { FeatureOverrideListService } from './feature-override-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Override])],
  providers: [FeatureOverrideListService],
  exports: [FeatureOverrideListService],
})
export class FeatureOverrideListModule {}
