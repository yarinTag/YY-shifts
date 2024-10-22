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
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { Role } from '../../types/enum/Role';
import { Gender } from '../../types/enum/Gender';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'text', unique: true })
  @IsPhoneNumber('IL')
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column('text')
  gender: Gender;

  @Column({ type: 'text', default: Role.EMPLOYEE, nullable: false })
  role: Role;

  @Column({ type: 'text', nullable: true })
  photo?: string;

  @Column({ nullable: true })
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];

  @OneToMany(() => Availability, (availability) => availability.user)
  availabilities: Availability[];
}
