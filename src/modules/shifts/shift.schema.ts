import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

import { BaseEntity } from '../BaseEntity';
import { User } from '../users/user.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';
import { Availability } from '../availabilities/availability.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';

@Entity()
export class Shift extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start: LocalDateTime;

  @Column('timestamp')
  end: LocalDateTime;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'work_cycle_id' })
  workCycleId: string;

  @Column({ name: 'shift_configuration_id' })
  shiftConfigurationId: string;

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
