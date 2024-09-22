import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Shift } from '../shifts/shift.schema';
import { Organization } from '../organizations/organization.schema';

export enum WorkDay {
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7
}

@Entity()
export class ShiftConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time')
  start: string;

  @Column('time')
  end: string;

  @Column({ type: 'int', default: 0 })
  amountOfWorkers: number;

  @Column('int')
  day: WorkDay;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.id
  )
  organization: Organization;

  @OneToMany(() => Shift, (shift) => shift.shiftConfiguration)
  shifts: Shift[];
}
