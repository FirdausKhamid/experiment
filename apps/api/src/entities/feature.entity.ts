import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Override } from './override.entity';


@Entity('features')
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx_features_key')
  @Column({ type: 'varchar', length: 100, unique: true })
  key: string;

  @Column({ name: 'is_enabled', type: 'boolean', default: false })
  isEnabled: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Override, (override) => override.feature)
  overrides: Override[];
}
