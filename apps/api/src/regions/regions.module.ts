import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { FeatureOverrideListModule } from '../feature-flags/feature-override-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region]),
    FeatureOverrideListModule,
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
