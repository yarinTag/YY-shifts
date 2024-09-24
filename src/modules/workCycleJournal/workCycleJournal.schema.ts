import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class WorkCycleJournal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @Column('bigint')
  workCycleNumber: number;

  @Column({ type: 'boolean', default: true })
  publish: boolean;

  @Column('uuid')
  workCycleId: string;

  @Column('uuid')
  workCycleConfigurationId: string;
}
