import AsyncRouter from './AsyncRouter';

import { validationMiddleware } from '../middlewares/validate';
import { IAvailabilityController } from '../modules/availabilities/availability.interface';
import { UpdateRequest } from '../modules/availabilities/dto/UpdateRequest';
import { CreateRequest } from '../modules/availabilities/dto/CreateRequest';
import { DeleteRequest } from '../modules/availabilities/dto/DeleteRequest';
import FindBy from '../modules/availabilities/dto/FindBy';

export default class AvailabilityRouter extends AsyncRouter {
  constructor(private availabilityController: IAvailabilityController) {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.get('/all', this.availabilityController.getAll);
    this.get(
      '',
      validationMiddleware(FindBy),
      this.availabilityController.findBy
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.availabilityController.create
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.availabilityController.update
    );
    this.delete(
      '/:shiftId',
      validationMiddleware(DeleteRequest),
      this.availabilityController.delete
    );
  }
}
