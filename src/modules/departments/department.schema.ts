import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.schema';
import { WorkCycleConfiguration } from '../workCycleConfiguration/workCycleConfiguration.schema';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  address: string;

  @OneToMany(() => User, (user: User) => user.department)
  users: User[];

  @OneToMany(
    () => WorkCycleConfiguration,
    (workCycleConfiguration: WorkCycleConfiguration) =>
      workCycleConfiguration.department
  )
  workCycleConfigurations: WorkCycleConfiguration[];
}
