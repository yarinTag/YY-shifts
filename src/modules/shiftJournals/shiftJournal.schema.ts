import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class ShiftJournal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  shiftId: string;

  @Column('uuid')
  workCycleId: string;

  @Column('uuid')
  shiftConfigurationId: string;
}
