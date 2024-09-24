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
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  updated_by: string;

  @ManyToOne(
    () => WorkCycle,
    (workCycle) => workCycle.id
  )
  workCycle: WorkCycle;

  @ManyToOne(
    () => ShiftConfiguration,
    (shiftConfiguration) => shiftConfiguration.id
  )
  shiftConfiguration: ShiftConfiguration;

  @ManyToOne(() => User, (user) => user.shifts)
  user: User;

  @OneToMany(() => Availability, (availability) => availability.shift)
  availabilities: Availability[];
}
