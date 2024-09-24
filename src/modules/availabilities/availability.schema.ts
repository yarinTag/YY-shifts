import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { User } from '../users/user.schema';
import { Shift } from '../shifts/shift.schema';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('uuid')
  createdBy: string;

  @Column('uuid')
  updatedBy: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  memo: string;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.availabilities)
  shift: Shift;
}
