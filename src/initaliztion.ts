import { dataSource } from './db';
import AvailabilityController from './modules/availabilities/availability.controller';
import { AvailabilityRepository } from './modules/availabilities/availability.repository';
import { Availability } from './modules/availabilities/availability.schema';
import AvailabilityService from './modules/availabilities/availability.service';
import { BaseRepository } from './modules/BaseRepository';
import { DepartmentController } from './modules/departments/department.controller';
import { DepartmentRepository } from './modules/departments/department.repository';
import { Department } from './modules/departments/department.schema';
import { DepartmentService } from './modules/departments/department.service';
import ShiftConfigurationController from './modules/shiftConfigurations/shiftConfiguration.controller';
import { ShiftConfigurationRepository } from './modules/shiftConfigurations/shiftConfiguration.repository';
import { ShiftConfiguration } from './modules/shiftConfigurations/shiftConfiguration.schema';
import ShiftConfigurationService from './modules/shiftConfigurations/shiftConfiguration.service';
import ShiftController from './modules/shifts/shift.controller';
import { ShiftRepository } from './modules/shifts/shift.repository';
import { Shift } from './modules/shifts/shift.schema';
import { ShiftService } from './modules/shifts/shift.service';
import UserController from './modules/users/user.controller';
import { UserRepository } from './modules/users/user.repository';
import { User } from './modules/users/user.schema';
import { UserService } from './modules/users/user.service';
import WorkCycleController from './modules/workCycle/workCycle.controller';
import { WorkCycleRepository } from './modules/workCycle/workCycle.repository';
import { WorkCycle } from './modules/workCycle/workCycle.schema';
import WorkCycleService from './modules/workCycle/workCycle.service';
import { WorkCycleConfigurationController } from './modules/workCycleConfiguration/workCycleConfiguration.controller';
import { WorkCycleConfigurationRepository } from './modules/workCycleConfiguration/workCycleConfiguration.repository';
import { WorkCycleConfiguration } from './modules/workCycleConfiguration/workCycleConfiguration.schema';
import { WorkCycleConfigurationService } from './modules/workCycleConfiguration/workCycleConfiguration.service';
import AvailabilityRouter from './routes/availabilityRoute';
import DepartmentRouter from './routes/departmentRoute';
import ShiftConfigurationRouter from './routes/shiftConfigurationRoute';
import ShiftRouter from './routes/shiftRoute';
import UserRouter from './routes/userRoute';
import WorkCycleConfigurationRouter from './routes/workCycleConfigurationRoute';
import WorkCycleRouter from './routes/workCycleRoute';

export class Initialize {
  readonly repositoryWorkCycleRepository = new WorkCycleRepository(
    new BaseRepository(WorkCycle, dataSource)
  );
  readonly shiftConfigurationRepository = new ShiftConfigurationRepository(
    new BaseRepository(ShiftConfiguration, dataSource)
  );

  createWorkCycleRouter() {
    const service = new WorkCycleService(this.repositoryWorkCycleRepository);
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

  createAvailabilityRouter() {
    const repository = new AvailabilityRepository(
      new BaseRepository(Availability, dataSource)
    );
    const service = new AvailabilityService(repository);
    const controller = new AvailabilityController(service);
    return new AvailabilityRouter(controller).getRouter();
  }

  createDepartmentRouter() {
    const departmentRepository = new DepartmentRepository(
      new BaseRepository(Department, dataSource)
    );
    const departmentService = new DepartmentService(departmentRepository);
    const departmentController = new DepartmentController(departmentService);
    return new DepartmentRouter(departmentController).getRouter();
  }

  createShiftRouter() {
    const repository = new ShiftRepository(
      new BaseRepository(Shift, dataSource)
    );
    const service = new ShiftService(repository);
    const controller = new ShiftController(service);
    return new ShiftRouter(controller).getRouter();
  }

  createUserRouter() {
    const userRepository = new UserRepository(
      new BaseRepository(User, dataSource)
    );
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);
    return new UserRouter(userController).getRouter();
  }

  createWorkCycleConfigurationRouter() {
    const repository = new WorkCycleConfigurationRepository(
      new BaseRepository(WorkCycleConfiguration, dataSource)
    );
    const service = new WorkCycleConfigurationService(repository);
    const controller = new WorkCycleConfigurationController(service);
    return new WorkCycleConfigurationRouter(controller).getRouter();
  }
}
