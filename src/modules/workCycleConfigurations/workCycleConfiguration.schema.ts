import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from "typeorm";
import { Organization } from "../organizations/organization.schema";
  
  @Entity()
  export class WorkCycleConfiguration {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column("int")
    amount_of_days: number;
  
    @Column({type: 'boolean',default: false})
    priority: boolean;
    

    @ManyToOne(() => Organization, (organization) => organization.id)
    organization_id: string;
  }
  