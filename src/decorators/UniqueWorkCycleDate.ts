import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {WorkCycle} from "../modules/workCycle/workCycle.schema";
import {dataSource} from "../db";
import {Instant, LocalDate} from "@js-joda/core";

@ValidatorConstraint()
export class UniqueWorkCycleDate implements ValidatorConstraintInterface {

    async validate(date: Date, args: ValidationArguments): Promise<boolean> {
        const {departmentId} = args.object as WorkCycle;
        const dateAsLocalDate = LocalDate.ofInstant(Instant.ofEpochMilli(date.getTime()));
        const workCycleRepository = dataSource.getRepository(WorkCycle);

        // Query the database to check if the date is already used within the same department
        const existingWorkCycle = await workCycleRepository.findOne({
            where: [
                {
                    departmentId,
                    start:dateAsLocalDate
                },
                {
                    departmentId,
                    end:dateAsLocalDate
                }
            ],
        });

        return !existingWorkCycle; // Return true if there's no overlap, false otherwise
    }

    defaultMessage(args: ValidationArguments) {
        return 'The provided start or end date conflicts with an existing work cycle in the same department.';
    }
}