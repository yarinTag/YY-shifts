import AsyncRouter from './AsyncRouter';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { DeleteRequest } from '../modules/departments/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';
import { IWorkCycleConfigurationController } from '../modules/workCycleConfiguration/workCycleConfiguration.interface';
import { WorkCycleConfigurationController } from '../modules/workCycleConfiguration/workCycleConfiguration.controller';

class WorkCycleConfigurationRouter extends AsyncRouter {
  constructor(
    private workCycleConfigurationController: IWorkCycleConfigurationController
  ) {
    super();
    this.initializeRoutes();
  }

  static create() {
    // const departmentRepository = new DepartmentRepository(
    //   new BaseRepository(Department, dataSource)
    // );
    // const departmentService = new DepartmentService(departmentRepository);
    const controller = new WorkCycleConfigurationController();
    return new WorkCycleConfigurationRouter(controller);
  }

  private initializeRoutes() {
    this.get('/all', this.workCycleConfigurationController.findAll);
    this.get('/', this.workCycleConfigurationController.findById);
    this.get(
      '/:id',
      validationMiddleware(GetByIdRequest),
      this.workCycleConfigurationController.findById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.workCycleConfigurationController.create
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.workCycleConfigurationController.patch
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      this.workCycleConfigurationController.delete
    );
  }
}

export default WorkCycleConfigurationRouter.create().getRouter();
