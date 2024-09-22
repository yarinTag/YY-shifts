import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.schema';
import { ShiftConfiguration } from '../shiftConfigurations/shiftConfiguration.schema';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(
    () => ShiftConfiguration,
    (shiftConfiguration: ShiftConfiguration) => shiftConfiguration.day
  )
  shiftConfigurations: ShiftConfiguration[];
}
