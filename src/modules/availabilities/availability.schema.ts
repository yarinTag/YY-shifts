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
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  updated_by: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  memo: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.id)
  shift: Shift;
}
