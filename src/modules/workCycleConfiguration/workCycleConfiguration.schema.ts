import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Department } from '../departments/department.schema';
  
  @Entity()
  export class WorkCycleConfiguration {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column('uuid')
    created_by: string;
  
    @Column('uuid')
    updated_by: string;
  
    @Column('int')
    cycle_days: number;

    @Column('int')
    legal_amount_of_work_days: number;

    @Column('int')
    amount_of_day_off: number;

    @ManyToOne(
      () => Department,
      (department) => department.id
    )
    department_id: Department;
  }
  