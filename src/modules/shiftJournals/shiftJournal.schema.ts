import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShiftJournal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start_time: Date;

  @Column('text')
  end_time: Date;

  @Column('text')
  work_cycle_id: string;

  @Column('text')
  shift_configuration_id: string;

  @Column('text')
  shift_id: string;
}
