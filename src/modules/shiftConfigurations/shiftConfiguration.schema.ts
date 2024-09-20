import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfigurations/workCycleConfiguration.schema';
import { Shift } from '../shifts/shift.schema';
import { Availability } from '../availabilities/availability.schema';

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

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workCycleConfiguration) => workCycleConfiguration.id
  )
  workCycleConfiguration: WorkCycleConfiguration;

  @OneToMany(() => Shift, (shift) => shift.shiftConfiguration)
  shifts: Shift[];

  @OneToMany(
    () => Availability,
    (availability) => availability.shiftConfiguration
  )
  availabilities: Availability[];
}
