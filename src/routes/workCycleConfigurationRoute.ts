import AsyncRouter from './AsyncRouter';
import { validationMiddleware } from '../middlewares/validate';
import { IWorkCycleConfigurationController } from '../modules/workCycleConfiguration/workCycleConfiguration.interface';
import { WorkCycleConfigurationController } from '../modules/workCycleConfiguration/workCycleConfiguration.controller';
import { WorkCycleConfiguration } from '../modules/workCycleConfiguration/workCycleConfiguration.schema';
import { dataSource } from '../db';
import { WorkCycleConfigurationRepository } from '../modules/workCycleConfiguration/workCycleConfiguration.repository';
import { BaseRepository } from '../modules/BaseRepository';
import { WorkCycleConfigurationService } from '../modules/workCycleConfiguration/workCycleConfiguration.service';
import { GetByIdRequest } from '../modules/workCycleConfiguration/dto/GetByIdRequest';
import { CreateRequest } from '../modules/workCycleConfiguration/dto/CreateRequest';
import { DeleteRequest } from '../modules/workCycleConfiguration/dto/DeleteRequest';
import { UpdateRequest } from '../modules/workCycleConfiguration/dto/UpdateRequest';
import { Role } from '../types/enum/Role';
import {
  RoleGuard,
  validateDepartmentActive,
  validateDepartmentMatch,
} from '../middlewares/authMiddleware';

class WorkCycleConfigurationRouter extends AsyncRouter {
  constructor(
    private workCycleConfigurationController: IWorkCycleConfigurationController
  ) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const repository = new WorkCycleConfigurationRepository(
      new BaseRepository(WorkCycleConfiguration, dataSource)
    );
    const service = new WorkCycleConfigurationService(repository);
    const controller = new WorkCycleConfigurationController(service);
    return new WorkCycleConfigurationRouter(controller);
  }

  private initializeRoutes() {
    this.get(
      '/all',
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validateDepartmentActive,
      this.workCycleConfigurationController.findAll
    );
    this.get(
      '/:id',
      validationMiddleware(GetByIdRequest),
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validateDepartmentActive,
      this.workCycleConfigurationController.findById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validateDepartmentActive,
      validateDepartmentMatch,
      this.workCycleConfigurationController.create
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validateDepartmentActive,
      this.workCycleConfigurationController.patch
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      RoleGuard([Role.ADMIN, Role.MANAGER]),
      validateDepartmentActive,
      this.workCycleConfigurationController.delete
    );
  }
}

export default WorkCycleConfigurationRouter.create().getRouter();
