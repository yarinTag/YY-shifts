import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class WorkCycleJournal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start_time: Date;

  @Column('text')
  end_time: Date;
  
  @Column('bigint')
  work_cycle_number: number;

  @Column({ type: 'boolean', default: true })
  publish: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  updated_by: string;
  
  @Column('text')
  work_cycle_id: string;

  @Column('text')
  work_cycle_configuration_id: string;
}
