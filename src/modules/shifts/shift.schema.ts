import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
import { User } from '../users/user.schema';
import { Availability } from '../availabilities/availability.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('uuid')
  createdBy: string;

  @Column('uuid')
  updatedBy: string;

  @ManyToOne(() => WorkCycle, (workCycle: WorkCycle) => workCycle.shifts)
  workCycle: WorkCycle;

  @ManyToOne(
    () => ShiftConfiguration,
    (shiftConfiguration: ShiftConfiguration) => shiftConfiguration.shifts
  )
  shiftConfiguration: ShiftConfiguration;

  @ManyToOne(() => User, (user: User) => user.shifts)
  user: User;

  @OneToMany(
    () => Availability,
    (availability: Availability) => availability.shift
  )
  availabilities: Availability[];
}
