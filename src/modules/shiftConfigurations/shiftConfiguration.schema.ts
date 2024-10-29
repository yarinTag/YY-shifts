import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Shift } from '../shifts/shift.schema';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { BaseEntity } from '../BaseEntity';
import { WorkDay } from '../../types/enum/workDay';
import { LocalTime } from '@js-joda/core';
import WorkDayTransformer from '../../types/transformer/WorkDayTransformer';
import { Max, Min } from 'class-validator';

@Entity()
@Index(
  'idx_shift_configuration_creation',
  ['start', 'end', 'day', 'workCycleConfigurationId'],
  {
    unique: true,
    where: 'deleted_at IS NULL',
  }
)
export class ShiftConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time')
  start: LocalTime;

  @Column('time')
  end: LocalTime;

  @Column({ type: 'int', default: 0 })
  amountOfWorkers: number;

  @Column({ type: 'int', transformer: new WorkDayTransformer()})
  @Min(1)
  @Max(7)
  day: WorkDay;

  @Column()
  workCycleConfigurationId: string;

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workCycleConfiguration: WorkCycleConfiguration) =>
      workCycleConfiguration.shiftConfigurations
  )
  workCycleConfiguration: WorkCycleConfiguration;

  @OneToMany(() => Shift, (shift: Shift) => shift.shiftConfiguration)
  shifts: Shift[];
}
