import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfigurations/workCycleConfiguration.schema';
  
  @Entity()
  export class ShiftConfiguration {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column("text")
    start: Date;
  
    @Column("text")
    end: Date;
  
    @Column({ type: 'int', default: 0 })
    amount_of_workers: number;
  
    @ManyToOne(() => WorkCycleConfiguration, (workCycleConfiguration) => workCycleConfiguration.id)
    work_cycle_configuration_id: WorkCycleConfiguration;
  }
  