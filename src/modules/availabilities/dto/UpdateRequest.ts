import { IsUUID } from 'class-validator';

import { Column } from 'typeorm';

export class UpdateRequest {
  @IsUUID()
  id: string;

  @Column('boolean')
  active?: boolean;

  @Column('text')
  memo?: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  shiftId: string;
}
