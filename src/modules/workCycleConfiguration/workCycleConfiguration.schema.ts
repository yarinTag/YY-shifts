import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Department } from '../departments/department.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';

@Entity()
export class WorkCycleConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('uuid')
  createdBy: string;

  @Column('uuid')
  updatedBy: string;

  @Column('int')
  cycleDays: number;

  @Column('int')
  legalAmountOfWorkDays: number;

  @Column('int')
  amountOfDayOff: number;

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
