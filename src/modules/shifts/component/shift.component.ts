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

    async createShifts(workCycle: WorkCycle, daysOff: Array<number>): Promise<Shift[]> {
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
            const currentLocalDate = start.plusDays(day);
            const shiftConfigurationsByDay = workDayToShiftConfigurationMap.get(
                currentLocalDate.dayOfWeek().value()
            );

            if (!shiftConfigurationsByDay) {
                continue;
            }

            if (!this.isDayOff(daysOff,day)) {
                const workingShifts = this.createWorkingShifts(shiftConfigurationsByDay, currentLocalDate, workCycle.id);
                createShiftPromises.push(...workingShifts);
            }

            if (this.isDayOff(daysOff,day)) {
                const daysOffShifts = this.createDayOffShift(shiftConfigurationsByDay, currentLocalDate, workCycle.id);
                createShiftPromises.push(...daysOffShifts);
            }

        }

        return await this.shiftRepository.saveAll(await Promise.all(createShiftPromises));
    }

    private isDayOff(daysOff: Array<number>, day: number) {
        if (!daysOff)
            return false;

        return daysOff.includes(day);
    }

    private createWorkingShifts(shiftConfigurations: ShiftConfiguration[], currentLocalDate: LocalDate, workCycleId: string): Promise<Shift>[] {
        const createShiftPromises: Promise<Shift>[] = [];
        for (const shiftConfiguration of shiftConfigurations) {
            for (let i = 0; i < shiftConfiguration.amountOfWorkers; i++) {
                const createRequest = this.create(this.mapToCreateShiftRequest(shiftConfiguration, currentLocalDate, workCycleId));
                createShiftPromises.push(createRequest);
            }
        }

        return createShiftPromises;
    }

    private createDayOffShift(shiftConfigurations: ShiftConfiguration[], currentLocalDate: LocalDate, workCycleId: string): Promise<Shift>[] {
        const createShiftPromises: Promise<Shift>[] = [];
        const createRequest = this.create(this.mapToCreateDayOffShiftRequest(shiftConfigurations[0], currentLocalDate, workCycleId));
        createShiftPromises.push(createRequest);

        return createShiftPromises;
    }

    private mapToCreateShiftRequest(shiftConfiguration: ShiftConfiguration, day: LocalDate, workCycleId: string): CreateRequest {
        const startShift = this.mapToLocalDateTime(day, shiftConfiguration.start);
        const endShift = this.mapToLocalDateTime(day, shiftConfiguration.end);

        return {
            start: startShift, end: endShift,
            shiftConfigurationId: shiftConfiguration.id,
            workCycleId: workCycleId,
            shiftType: ShiftType.WORKING
        };
    }

    private mapToCreateDayOffShiftRequest(shiftConfiguration: ShiftConfiguration, day: LocalDate, workCycleId: string): CreateRequest {
        const startShift = this.mapToLocalDateTime(day, LocalTime.of(0, 0, 0));
        const endShift = this.mapToLocalDateTime(day, LocalTime.of(23, 59, 0));

        return {
            start: startShift, end: endShift,
            shiftConfigurationId: shiftConfiguration.id,
            workCycleId: workCycleId,
            shiftType: ShiftType.DAY_OFF
        };
    }

    private mapToLocalDateTime(day: LocalDate, time: LocalTime): LocalDateTime {
        return day.atStartOfDay()
            .withHour(time.hour())
            .withMinute(time.minute());
    }

    private async create(req: CreateRequest): Promise<Shift> {
        const shift = this.shiftRepository.create(req);
        await validationEntity(Shift, shift);

        return shift;
    }
}
