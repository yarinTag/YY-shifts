import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Shift } from '../shifts/shift.schema';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { BaseEntity } from '../BaseEntity';
import { WorkDay } from '../../types/enum/workDay';

@Entity()
export class ShiftConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time')
  start: string;

  @Column('time')
  end: string;

  @Column({ type: 'int', default: 0 })
  amountOfWorkers: number;

  @Column('int')
  day: WorkDay;

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workCycleConfiguration: WorkCycleConfiguration) =>
      workCycleConfiguration.shiftConfigurations
  )
  workCycleConfiguration: WorkCycleConfiguration;

  @Column({ name: 'work_cycle_configuration_id', nullable: true })
  workCycleConfigurationId: string;

  @OneToMany(() => Shift, (shift: Shift) => shift.shiftConfiguration)
  shifts: Shift[];
}
