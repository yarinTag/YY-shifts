import AsyncRouter from './AsyncRouter';

import { IShiftConfigurationController } from '../modules/shiftConfigurations/shiftConfiguration.interface';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/shiftConfigurations/dto/CreateRequest';
import { UpdateRequest } from '../modules/shiftConfigurations/dto/UpdateRequest';
import { DeleteRequest } from '../modules/shiftConfigurations/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/shiftConfigurations/dto/GetRequest';

export default class ShiftConfigurationRouter extends AsyncRouter {
  constructor(
    private shiftConfigurationController: IShiftConfigurationController
  ) {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.get('/', this.shiftConfigurationController.getAll);
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
