import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import crypto from 'crypto';
import * as uuid from 'uuid';

import { BaseEntity } from '../BaseEntity';
import { User } from '../users/user.schema';
import { Shift } from '../shifts/shift.schema';

@Entity()
export class Availability extends BaseEntity {
  @PrimaryColumn('uuid', {
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  shiftId: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  memo: string;

  @ManyToOne(() => User, (user) => user.availabilities)
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.availabilities)
  shift: Shift;

  @BeforeInsert()
  async beforeInsert() {
    const combined = `${this.userId}-${this.shiftId}`;
    const hash = crypto.createHash('sha256').update(combined).digest('hex');
    this.id = uuid.v5(hash, uuid.v4());
  }
}
