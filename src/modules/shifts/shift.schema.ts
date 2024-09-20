import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { WorkCycle } from "../workCycle/workCycle.schema";
import { ShiftConfiguration } from "../shiftConfigurations/shiftConfiguration.schema";

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  start: Date;

  @Column("text")
  end: Date;

  @ManyToOne(() => WorkCycle, (workCycle) => workCycle.id)
  work_cycle_id: string;

  @ManyToOne(() => ShiftConfiguration, (shiftConfiguration) => shiftConfiguration.id)
  shift_configuration_id: string;
}
