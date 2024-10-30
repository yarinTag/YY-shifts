import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../users/user.schema';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { BaseEntity } from '../BaseEntity';
import { WorkCycle } from '../workCycle/workCycle.schema';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Length(3, 50)
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @OneToMany(() => User, (user: User) => user.department)
  users: User[];

  @OneToMany(() => WorkCycle, (workCycle: WorkCycle) => workCycle.department)
  workCycles: WorkCycle[];

  @OneToMany(
    () => WorkCycleConfiguration,
    (workCycleConfiguration: WorkCycleConfiguration) =>
      workCycleConfiguration.department
  )
  workCycleConfigurations: WorkCycleConfiguration[];
}
