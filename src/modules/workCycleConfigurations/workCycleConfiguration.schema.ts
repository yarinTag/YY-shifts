import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Organization } from '../organizations/organization.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
import { WorkCycle } from '../workCycle/workCycle.schema';

@Entity()
export class WorkCycleConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  amount_of_days: number;

  @Column({ type: 'boolean', default: false })
  priority: boolean;

  @OneToOne(
    () => Organization,
    (organization: Organization) => organization.workCycleConfiguration
  )
  organization: Organization;

  @OneToMany(
    () => ShiftConfiguration,
    (shiftConfiguration: ShiftConfiguration) =>
      shiftConfiguration.workCycleConfiguration
  )
  shiftConfigurations: ShiftConfiguration[];

  @OneToMany(
    () => WorkCycle,
    (workCycle: WorkCycle) => workCycle.workCycleConfiguration
  )
  workCycles: WorkCycle[];
}
