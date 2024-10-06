import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Generated,
} from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';
import { LocalDate } from '@js-joda/core';

@Entity()
export class WorkCycle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // ISO 8601
  // "2024-10-06"
  @Column('date')
  start: LocalDate;
  // ISO 8601
  // "2024-10-06"
  @Column('date')
  end: LocalDate;

  @Column('bigint')
  @Generated('increment')
  workCycleNumber: number;

  @Column({ type: 'boolean', default: false })
  publish: boolean;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'work_cycle_configuration_id' })
  workCycleConfigurationId: string;

  @OneToMany(() => Shift, (shift: Shift) => shift.workCycle)
  shifts: Shift[];

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workConfiguration) => workConfiguration.workCycle
  )
  workCycleConfiguration: WorkCycleConfiguration;
}
