import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';
import { Shift } from '../shifts/shift.schema';

@Entity()
export class ShiftJournal extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false })
  data: Shift;
}
