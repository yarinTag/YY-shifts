import AsyncRouter from './AsyncRouter';

import { dataSource } from '../db';
import { BaseRepository } from '../modules/BaseRepository';
import { IShiftConfigurationController } from '../modules/shiftConfigurations/shiftConfiguration.interface';
import { ShiftConfigurationRepository } from '../modules/shiftConfigurations/shiftConfiguration.repository';
import { ShiftConfiguration } from '../modules/shiftConfigurations/shiftConfiguration.schema';
import ShiftConfigurationService from '../modules/shiftConfigurations/shiftConfiguration.service';
import ShiftConfigurationController from '../modules/shiftConfigurations/shiftConfiguration.controller';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/shiftConfigurations/dto/CreateRequest';
import { UpdateRequest } from '../modules/shiftConfigurations/dto/UpdateRequest';
import { DeleteRequest } from '../modules/shiftConfigurations/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/shiftConfigurations/dto/GetRequest';

class ShiftConfigurationRouter extends AsyncRouter {
  constructor(
    private shiftConfigurationController: IShiftConfigurationController
  ) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const repository = new ShiftConfigurationRepository(
      new BaseRepository(ShiftConfiguration, dataSource)
    );
    const service = new ShiftConfigurationService(repository);
    const controller = new ShiftConfigurationController(service);
    return new ShiftConfigurationRouter(controller);
  }

  private initializeRoutes() {
    this.get('/all', this.shiftConfigurationController.getAll);
    this.get(
      '/:id',
      validationMiddleware(GetByIdRequest),
      this.shiftConfigurationController.getById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.shiftConfigurationController.create
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.shiftConfigurationController.update
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      this.shiftConfigurationController.delete
    );
  }
}

export default ShiftConfigurationRouter.create().getRouter();
