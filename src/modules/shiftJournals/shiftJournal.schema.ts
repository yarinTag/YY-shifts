import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ShiftJournal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start_time: Date;

  @Column('text')
  end_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  updated_by: string;

  @Column('text')
  user_id: string;

  @Column('text')
  shift_id: string;
  
  @Column('text')
  work_cycle_id: string;

  @Column('text')
  shift_configuration_id: string;
}
