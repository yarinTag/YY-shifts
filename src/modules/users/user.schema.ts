import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Organization } from '../organizations/organization.schema';
import { Availability } from '../availabilities/availability.schema';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToOne(() => Organization, (organization) => organization.id)
  organization: Organization;

  @OneToMany(() => Availability, (availability) => availability.user)
  availabilities: Availability[];
}
