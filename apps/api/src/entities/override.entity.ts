import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { Feature } from './feature.entity';

export enum OverrideTargetType {
  USER = 'user',
  GROUP = 'group',
  REGION = 'region',
}

@Entity('overrides')
@Unique(['feature', 'targetType', 'targetId'])
@Index('idx_overrides_target', ['targetType', 'targetId'])
export class Override {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Feature, (feature) => feature.overrides, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feature_id' })
  feature: Feature;

  @Column({
    type: 'enum',
    enum: OverrideTargetType,
    enumName: 'override_target_type',
    name: 'target_type',
  })
  targetType: OverrideTargetType;

  @Column({ name: 'target_id', type: 'varchar', length: 255 })
  targetId: string;

  @Column({ name: 'is_enabled', type: 'boolean' })
  isEnabled: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
}
