import { dataSource } from '../db';
import AsyncRouter from './AsyncRouter';
import { Shift } from '../modules/shifts/shift.schema';
import { BaseRepository } from '../modules/BaseRepository';
import { GetRequest } from '../modules/shifts/dto/GetRequest';
import { ShiftService } from '../modules/shifts/shift.service';
import { validationMiddleware } from '../middlewares/validate';
import ShiftController from '../modules/shifts/shift.controller';
import { CreateRequest } from '../modules/shifts/dto/CreateRequest';
import { DeleteRequest } from '../modules/shifts/dto/DeleteRequest';
import { UpdateRequest } from '../modules/shifts/dto/UpdateRequest';
import { IShiftController } from '../modules/shifts/shift.interface';
import { ShiftRepository } from '../modules/shifts/shift.repository';

class DepartmentRouter extends AsyncRouter {
  constructor(private controller: IShiftController) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const departmentRepository = new ShiftRepository(
      new BaseRepository(Shift, dataSource)
    );
    const service = new ShiftService(departmentRepository);
    const controller = new ShiftController(service);
    return new DepartmentRouter(controller);
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

export default DepartmentRouter.create().getRouter();
