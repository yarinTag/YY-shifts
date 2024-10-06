import { dataSource } from '../db';
import { validationMiddleware } from '../middlewares/validate';
import { BaseRepository } from '../modules/BaseRepository';
import { CreateRequest } from '../modules/workCycle/dto/CreateRequest';
import { DeleteRequest } from '../modules/workCycle/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/workCycle/dto/GetByIdRequest';
import { UpdateRequest } from '../modules/workCycle/dto/UpdateRequest';
import WorkCycleController from '../modules/workCycle/workCycle.controller';
import { IWorkCycleController } from '../modules/workCycle/workCycle.interface';
import { WorkCycleRepository } from '../modules/workCycle/workCycle.repository';
import { WorkCycle } from '../modules/workCycle/workCycle.schema';
import WorkCycleService from '../modules/workCycle/workCycle.service';
import AsyncRouter from './AsyncRouter';

class WorkCycleRouter extends AsyncRouter {
  constructor(private workCycleController: IWorkCycleController) {
    super();
    this.initializeRoutes();
  }

  static create() {
    const repository = new WorkCycleRepository(
      new BaseRepository(WorkCycle, dataSource)
    );
    const service = new WorkCycleService(repository);
    const controller = new WorkCycleController(service);
    return new WorkCycleRouter(controller);
  }

  private initializeRoutes() {
    this.get('/all', this.workCycleController.getAll);
    this.get(
      '/:id',
      validationMiddleware(GetByIdRequest),
      this.workCycleController.getById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.workCycleController.create
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.workCycleController.update
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      this.workCycleController.delete
    );
  }
}

export default WorkCycleRouter.create().getRouter();
