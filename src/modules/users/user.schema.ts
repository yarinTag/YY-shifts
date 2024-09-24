import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Department } from '../departments/department.schema';
import { Availability } from '../availabilities/availability.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column('text')
  gender: Gender;

  @Column('text')
  photo: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];

  @OneToMany(() => Availability, (availability) => availability.user)
  availabilities: Availability[];
}
