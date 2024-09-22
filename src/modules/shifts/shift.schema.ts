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

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

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
