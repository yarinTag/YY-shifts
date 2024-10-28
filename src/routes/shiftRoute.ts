import AsyncRouter from './AsyncRouter';
import { GetRequest } from '../modules/shifts/dto/GetRequest';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/shifts/dto/CreateRequest';
import { DeleteRequest } from '../modules/shifts/dto/DeleteRequest';
import { UpdateRequest } from '../modules/shifts/dto/UpdateRequest';
import { IShiftController } from '../modules/shifts/shift.interface';

export default class ShiftRouter extends AsyncRouter {
  constructor(private controller: IShiftController) {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.get('/all', this.controller.findAllShifts);
    this.get(
      '/:id',
      validationMiddleware(GetRequest),
      this.controller.getShiftById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.controller.createShift
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.controller.updateShift
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      this.controller.deleteShift
    );
  }
}
