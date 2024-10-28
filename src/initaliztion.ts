import { dataSource } from './db';
import { BaseRepository } from './modules/BaseRepository';
import ShiftConfigurationController from './modules/shiftConfigurations/shiftConfiguration.controller';
import { ShiftConfigurationRepository } from './modules/shiftConfigurations/shiftConfiguration.repository';
import { ShiftConfiguration } from './modules/shiftConfigurations/shiftConfiguration.schema';
import ShiftConfigurationService from './modules/shiftConfigurations/shiftConfiguration.service';
import { ShiftComponent } from './modules/shifts/component/shift.component';
import WorkCycleController from './modules/workCycle/workCycle.controller';
import { WorkCycleRepository } from './modules/workCycle/workCycle.repository';
import { WorkCycle } from './modules/workCycle/workCycle.schema';
import WorkCycleService from './modules/workCycle/workCycle.service';
import ShiftConfigurationRouter from './routes/shiftConfigurationRoute';
import WorkCycleRouter from './routes/workCycleRoute';

export class Initialize {
  readonly repositoryWorkCycleRepository = new WorkCycleRepository(
    new BaseRepository(WorkCycle, dataSource)
  );
  readonly shiftConfigurationRepository = new ShiftConfigurationRepository(
    new BaseRepository(ShiftConfiguration, dataSource)
  );
  readonly shiftComponent = new ShiftComponent(
    this.shiftConfigurationRepository
  );

  createWorkCycleRouter() {
    const service = new WorkCycleService(
      this.repositoryWorkCycleRepository,
      this.shiftComponent
    );
    const controller = new WorkCycleController(service);
    return new WorkCycleRouter(controller).getRouter();
  }

  createShiftConfigurationRouter() {
    const service = new ShiftConfigurationService(
      this.shiftConfigurationRepository
    );
    const controller = new ShiftConfigurationController(service);
    return new ShiftConfigurationRouter(controller).getRouter();
  }
}
