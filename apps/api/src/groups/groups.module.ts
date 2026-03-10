import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { FeatureOverrideListModule } from '../feature-flags/feature-override-list.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    FeatureOverrideListModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
