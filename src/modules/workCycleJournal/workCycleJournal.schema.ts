import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { WorkCycle } from '../workCycle/workCycle.schema';

@Entity()
export class WorkCycleJournal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false })
  data: WorkCycle;
}
