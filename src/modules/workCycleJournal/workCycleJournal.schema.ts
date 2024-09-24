import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WorkCycleJournal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  start: Date;

  @Column('text')
  end: Date;

  @Column('bigint')
  workCycleNumber: number;

  @Column({ type: 'boolean', default: true })
  publish: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('uuid')
  createdBy: string;

  @Column('uuid')
  updatedBy: string;

  @Column('uuid')
  workCycleId: string;

  @Column('uuid')
  workCycleConfigurationId: string;
}
