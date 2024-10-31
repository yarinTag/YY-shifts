import {IsArray, IsBoolean, IsNotEmpty, IsOptional, IsUUID} from 'class-validator';
import {LocalDate} from '@js-joda/core';
import {Transform} from 'class-transformer';

export class CreateRequest {
    // ISO 8601
    // "2024-10-06"
    @IsNotEmpty()
    @Transform(({value}) => LocalDate.parse(value))
    start: LocalDate;
    // ISO 8601
    // "2024-10-10"
    @IsNotEmpty()
    @Transform(({value}) => LocalDate.parse(value))
    end: LocalDate;

    @IsArray()
    @IsOptional()
    daysOff: number[];

    @IsBoolean()
    publish: boolean;

    @IsUUID()
    workCycleConfigurationId: string;

    @IsUUID()
    departmentId: string;
}
