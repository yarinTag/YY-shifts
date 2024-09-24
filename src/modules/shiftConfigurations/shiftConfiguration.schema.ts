import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Shift } from '../shifts/shift.schema';
import { Department } from '../departments/department.schema';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';

export enum WorkDay {
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7,
}

@Entity()
export class ShiftConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time')
  start: string;

  @Column('time')
  end: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  updated_by: string;

  @Column({ type: 'int', default: 0 })
  amount_of_workers: number;

  @Column('int')
  day_of_week: WorkDay;

  @OneToOne(
    () => WorkCycleConfiguration,
    (workCycleConfiguration: WorkCycleConfiguration) =>
      workCycleConfiguration.id
  )
  work_cycle_configuration_id: WorkCycleConfiguration;
  
  @ManyToOne(() => Department, (department: Department) => department.id)
  department: Department;

  @OneToMany(() => Shift, (shift) => shift.shiftConfiguration)
  shifts: Shift[];
}
