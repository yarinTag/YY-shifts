import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class WorkCycle extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column('bigint')
  workCycleNumber: number;

  @Column({ type: 'boolean', default: true })
  publish: boolean;

  @OneToMany(() => Shift, (shift: Shift) => shift.workCycle)
  shifts: Shift[];

  @ManyToOne(
    () => WorkCycleConfiguration,
    (workConfiguration) => workConfiguration.workCycle
  )
  workCycleConfiguration: WorkCycleConfiguration;
}
