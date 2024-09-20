import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Shift } from "../shifts/shift.schema";

@Entity()
export class ShiftJournal {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  start_time: Date;

  @Column("text")
  end_time: Date;

  @Column("text")
  work_cycle_id: string;
  
  @Column("text")
  shift_configuration_id: string;

  @ManyToOne(
    () => Shift,
    (shift) => shift.id
  )
  shift_id: string;
}
