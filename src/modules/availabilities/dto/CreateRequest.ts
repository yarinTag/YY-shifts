import { IsUUID } from 'class-validator';

import { Column } from 'typeorm';

export class CreateRequest {
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column('text')
  memo?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
