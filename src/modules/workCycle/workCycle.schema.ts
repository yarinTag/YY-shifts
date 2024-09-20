import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfigurations/workCycleConfiguration.schema';

@Entity()
export class WorkCycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @Column({ type: 'boolean', default: false })
  priority: boolean;

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workCycleConfiguration) => workCycleConfiguration.id
  )
  workCycleConfiguration: WorkCycleConfiguration;
}
