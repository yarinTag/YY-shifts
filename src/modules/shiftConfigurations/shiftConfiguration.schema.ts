import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { WorkDay } from '../workDays/workDay.schema';
import { Shift } from '../shifts/shift.schema';

@Entity()
export class ShiftConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @Column({ type: 'int', default: 0 })
  amountOfWorkers: number;

  @ManyToOne(() => WorkDay, (workDay: WorkDay) => workDay.id)
  workDay: WorkDay;

  @OneToMany(() => Shift, (shift) => shift.shiftConfiguration)
  shifts: Shift[];
}
