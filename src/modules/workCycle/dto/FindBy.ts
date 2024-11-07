import {IsNotEmpty, IsNumberString, IsUUID, ValidateIf} from 'class-validator';
import {LocalDate} from "@js-joda/core";

export class FindBy {
    @ValidateIf((obj) => !obj.workCycleNumber && !obj.departmentId && !obj.start && !obj.end)
    @IsUUID()
    id?: string;

    @ValidateIf((obj) => !obj.id && !obj.departmentId && !obj.start && !obj.end)
    @IsNumberString()
    workCycleNumber?: number;

    @ValidateIf((obj) => !obj.id && !obj.workCycleNumber && !obj.start && !obj.end)
    @IsUUID()
    departmentId?: string;

    @ValidateIf((obj) => !obj.id && !obj.workCycleNumber && !obj.end && !obj.departmentId)
    @IsNotEmpty()
    start?: LocalDate;

    @ValidateIf((obj) => !obj.id && !obj.workCycleNumber && !obj.start && !obj.departmentId)
    @IsNotEmpty()
    end?: LocalDate;
}
