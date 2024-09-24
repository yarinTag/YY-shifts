import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
  
  @Entity()
  export class WorkCycle {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('timestamp')
    start: Date;
  
    @Column('timestamp')
    end: Date;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column('uuid')
    created_by: string;
  
    @Column('uuid')
    updated_by: string;
  
    @Column('bigint')
    work_cycle_number: number;

    @Column({ type: 'boolean', default: true })
    publish: boolean;

    @ManyToOne(
      () => WorkCycleConfiguration,
      (workConfiguration) => workConfiguration.id
    )
    work_cycle_configuration_id: WorkCycleConfiguration;
  }
  