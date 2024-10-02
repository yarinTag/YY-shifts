import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Department } from '../departments/department.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';
import { BaseEntity } from '../BaseEntity';
import { WorkDay } from '../../types/enum/workDay';

@Entity()
export class WorkCycleConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  cycleDays: number;

  @Column('int')
  startDay: WorkDay;

  @Column('int')
  legalAmountOfWorkDays: number;

  @Column('int')
  amountOfDayOff: number;

  @Column('uuid')
  departmentId: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(
    () => Department,
    (department: Department) => department.workCycleConfigurations
  )
  department: Department;

  @OneToMany(
    () => ShiftConfiguration,
    (shiftConfiguration: ShiftConfiguration) =>
      shiftConfiguration.workCycleConfiguration
  )
  shiftConfigurations: ShiftConfiguration[];

  @OneToMany(
    () => WorkCycle,
    (workCycle: WorkCycle) => workCycle.workCycleConfiguration
  )
  workCycle: WorkCycle[];
}
