import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Department } from '../departments/department.schema';
import { Availability } from '../availabilities/availability.schema';
import { Shift } from '../shifts/shift.schema';
import { BaseEntity } from '../BaseEntity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Role {
  Admin = 'admin',
  MANAGER = 'manager',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  phone: string;

  @Column()
  password: string;

  @Column('text')
  gender: Gender;

  @Column({ type: 'text', default: Role.EMPLOYEE })
  role: Role;

  @Column({ type: 'text', nullable: true })
  photo?: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];

  @OneToMany(() => Availability, (availability) => availability.user)
  availabilities: Availability[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
