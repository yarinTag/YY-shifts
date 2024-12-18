import { Entity, ManyToOne, Column, PrimaryColumn } from 'typeorm';
import { User } from '../users/user.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Availability extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  shiftId: string;

  @Column('text')
  memo: string;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.availabilities)
  shift: Shift;

  get id(): object {
    return { userId: this.userId, shiftId: this.shiftId };
  }
}
