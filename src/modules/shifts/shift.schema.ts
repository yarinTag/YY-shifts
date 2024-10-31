import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {LocalDateTime} from '@js-joda/core';

import {BaseEntity} from '../BaseEntity';
import {User} from '../users/user.schema';
import {WorkCycle} from '../workCycle/workCycle.schema';
import {Availability} from '../availabilities/availability.schema';
import {ShiftConfiguration} from '../shiftConfigurations/shiftConfiguration.schema';
import {ShiftType} from '../../types/enum/ShiftType';
import LocalDateTimeTransformer from "../../types/transformer/LocalDateTimeTransformer";
import {Type} from "class-transformer";

@Entity()
export class Shift extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'timestamp', transformer: new LocalDateTimeTransformer()})
    @Type(() => Date)
    start: LocalDateTime;

    @Column({type: 'timestamp', transformer: new LocalDateTimeTransformer()})
    @Type(() => Date)
    end: LocalDateTime;

    @Column({nullable: true})
    userId: string;

    @Column({type: 'text', default: ShiftType.WORKING})
    shiftType: ShiftType;

    @Column()
    workCycleId: string;

    @Column()
    shiftConfigurationId: string;

    @ManyToOne(() => WorkCycle, (workCycle: WorkCycle) => workCycle.shifts)
    workCycle: WorkCycle;

    @ManyToOne(
        () => ShiftConfiguration,
        (shiftConfiguration: ShiftConfiguration) => shiftConfiguration.shifts
    )
    shiftConfiguration: ShiftConfiguration;

    @ManyToOne(() => User, (user: User) => user.shifts)
    user: User;

    @OneToMany(
        () => Availability,
        (availability: Availability) => availability.shift
    )
    availabilities: Availability[];
}
