import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  DeleteDateColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import HttpContext from 'express-http-context';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'uuid',
    nullable: true,
    update: false,
  })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'uuid',
    nullable: true,
  })
  updatedBy: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date | null;

  @BeforeInsert()
  setCreatedByAndDate() {
    const context = HttpContext.get('user');
    if (context) this.createdBy = context.id;
  }

  @BeforeUpdate()
  setUpdatedByAndDate() {
    const context = HttpContext.get('user');

    if (context) this.updatedBy = context.id;

    this.updatedAt = new Date();
  }
}
