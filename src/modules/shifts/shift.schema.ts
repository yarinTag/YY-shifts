import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
import { User } from '../users/user.schema';
import { Availability } from '../availabilities/availability.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

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
