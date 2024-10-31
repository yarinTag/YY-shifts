import {LocalDate, LocalDateTime, LocalTime} from '@js-joda/core';
import {IShiftConfigurationRepository} from '../../shiftConfigurations/shiftConfiguration.interface';
import {ShiftConfiguration} from '../../shiftConfigurations/shiftConfiguration.schema';
import {WorkCycle} from '../../workCycle/workCycle.schema';
import {groupBy} from '../../../utils/CodeUtils';
import {Shift} from "../shift.schema";
import {IShiftRepository} from "../shift.interface";
import {CreateRequest} from "../dto/CreateRequest";
import {validationEntity} from "../../../decorators/validateEntity";
import {ShiftType} from "../../../types/enum/ShiftType";

export class ShiftComponent {
    constructor(
        private readonly shiftConfigurationRepository: IShiftConfigurationRepository,
        private readonly shiftRepository: IShiftRepository
    ) {
    }

    async createShifts(workCycle: WorkCycle):Promise<Shift[]> {
        const createShiftPromises: Promise<Shift>[] = [];
        const shiftConfigurations: ShiftConfiguration[] =
            await this.shiftConfigurationRepository.findAllByWorkCycleConfigurationId(
                workCycle.workCycleConfigurationId
            );
        const workDayToShiftConfigurationMap = groupBy(
            shiftConfigurations,
            (shiftConfiguration: ShiftConfiguration) => shiftConfiguration.day
        );
        const start: LocalDate = workCycle.start;
        const days = workCycle.start.until(workCycle.end).days();

        for (let day = 0; day < days; day++) {
            const currentDay = start.plusDays(day);
            const shiftConfigurationsByDay = workDayToShiftConfigurationMap.get(
                currentDay.dayOfWeek().value()
            );

            if (!shiftConfigurationsByDay) {
                continue;
            }

            // isDayOff ? -> continue or create empty shift or config it on work cycle configuration

            for (const shiftConfiguration of shiftConfigurationsByDay) {
                for (let i = 0; i < shiftConfiguration.amountOfWorkers; i++) {
                    const createRequest = this.create(this.mapToCreateShiftRequest(shiftConfiguration,currentDay,workCycle.id));
                    createShiftPromises.push(createRequest);
                }
            }

        }

        return await this.shiftRepository.saveAll(await Promise.all(createShiftPromises));
    }

    mapToCreateShiftRequest(shiftConfiguration: ShiftConfiguration,day:LocalDate,workCycleId:string): CreateRequest {
        const startShift = this.mapToLocalDateTime(day,shiftConfiguration.start);
        const endShift = this.mapToLocalDateTime(day,shiftConfiguration.end);

        return {
            start: startShift, end: endShift,
            shiftConfigurationId: shiftConfiguration.id,
            workCycleId: workCycleId,
            shiftType: ShiftType.WORKING
        };
    }

    mapToLocalDateTime(day:LocalDate,time:LocalTime):LocalDateTime {
        return day.atStartOfDay()
            .withHour(time.hour())
            .withMinute(time.minute());
    }

    async create(req: CreateRequest): Promise<Shift> {
        const shift = this.shiftRepository.create(req);
        await validationEntity(Shift, shift);

        return shift;
    }

    // private isDayOff(day: LocalDate): boolean {
    //   return false;
    // }
}
