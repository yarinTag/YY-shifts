import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
import { User } from '../users/user.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';
  
  @Entity()
  export class Availability {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @ManyToOne(() => User, (user) => user.id)
    work_cycle_configuration_id: User;

    @ManyToOne(() => ShiftConfiguration, (shiftConfiguration) => shiftConfiguration.id)
    shift_configuration_id: string;
  }
  