import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Organization } from '../organizations/organization.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';

@Entity()
export class WorkDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  day: number;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.workDay
  )
  organization: Organization;

  @OneToMany(
    () => ShiftConfiguration,
    (shiftConfiguration: ShiftConfiguration) => shiftConfiguration.workDay
  )
  shiftConfigurations: ShiftConfiguration[];
}
