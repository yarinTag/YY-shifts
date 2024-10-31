import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/workCycle/dto/CreateRequest';
import { DeleteRequest } from '../modules/workCycle/dto/DeleteRequest';
import { FindBy } from '../modules/workCycle/dto/FindBy';
import { UpdateRequest } from '../modules/workCycle/dto/UpdateRequest';
import { IWorkCycleController } from '../modules/workCycle/workCycle.interface';
import AsyncRouter from './AsyncRouter';

export default class WorkCycleRouter extends AsyncRouter {
  constructor(private workCycleController: IWorkCycleController) {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.get('/all', this.workCycleController.findAll);
    this.get('', validationMiddleware(FindBy), this.workCycleController.findBy);
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
