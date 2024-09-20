import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkCycle } from '../workCycle/workCycle.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @ManyToOne(() => WorkCycle, (workCycle) => workCycle.id)
  workCycle: WorkCycle;

  @ManyToOne(
    () => ShiftConfiguration,
    (shiftConfiguration) => shiftConfiguration.id
  )
  shiftConfiguration: string;
}
