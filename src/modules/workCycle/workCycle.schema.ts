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
import { Department } from '../departments/department.schema';
import LocalDateTransformer from '../../types/transformer/LocalDateTransformer';

@Entity()
export class WorkCycle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // ISO 8601
  // "2024-10-06"
  @Column({ type: 'date', transformer: new LocalDateTransformer() })
  start: LocalDate;
  // ISO 8601
  // "2024-10-06"
  @Column({ type: 'date', transformer: new LocalDateTransformer() })
  end: LocalDate;

  @Column('bigint')
  @Generated('increment')
  workCycleNumber: number;

  @Column({ type: 'boolean', default: false })
  publish: boolean;

  @Column({ name: 'department_id', type: 'uuid' })
  departmentId: string;

  @ManyToOne(
    () => Department,
    (deaprtment: Department) => deaprtment.workCycles
  )
  department: Department;

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
