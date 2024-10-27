import AsyncRouter from './AsyncRouter';

import { dataSource } from '../db';
import { BaseRepository } from '../modules/BaseRepository';
import { validationMiddleware } from '../middlewares/validate';
import { IAvailabilityController } from '../modules/availabilities/availability.interface';
import { AvailabilityRepository } from '../modules/availabilities/availability.repository';
import { Availability } from '../modules/availabilities/availability.schema';
import AvailabilityController from '../modules/availabilities/availability.controller';
import AvailabilityService from '../modules/availabilities/availability.service';
import { UpdateRequest } from '../modules/availabilities/dto/UpdateRequest';
import { CreateRequest } from '../modules/availabilities/dto/CreateRequest';
import { FindBy } from '../modules/availabilities/dto/FindBy';
import { DeleteRequest } from '../modules/availabilities/dto/DeleteRequest';

class AvailabilityRouter extends AsyncRouter {
  constructor(private availabilityController: IAvailabilityController) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const repository = new AvailabilityRepository(
      new BaseRepository(Availability, dataSource)
    );
    const service = new AvailabilityService(repository);
    const controller = new AvailabilityController(service);
    return new AvailabilityRouter(controller);
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

export default AvailabilityRouter.create().getRouter();
