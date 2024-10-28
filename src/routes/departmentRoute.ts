import AsyncRouter from './AsyncRouter';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { DeleteRequest } from '../modules/departments/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';
import { IDepartmentController } from '../modules/departments/department.interface';

export default class DepartmentRouter extends AsyncRouter {
  constructor(private departmentController: IDepartmentController) {
    super();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.get('/all', this.departmentController.getAllDepartments);
    this.get('/', this.departmentController.getDepartmentById);
    this.get(
      '/:id',
      validationMiddleware(GetByIdRequest),
      this.departmentController.getDepartmentById
    );
    this.post(
      '/',
      validationMiddleware(CreateRequest),
      this.departmentController.createDepartment
    );
    this.patch(
      '/:id',
      validationMiddleware(UpdateRequest),
      this.departmentController.patchDepartment
    );
    this.delete(
      '/:id',
      validationMiddleware(DeleteRequest),
      this.departmentController.deleteDepartment
    );
  }
}
