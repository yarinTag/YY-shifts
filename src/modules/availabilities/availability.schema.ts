import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Availability extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  memo: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'shift_id' })
  shiftId: string;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.availabilities)
  shift: Shift;
}
