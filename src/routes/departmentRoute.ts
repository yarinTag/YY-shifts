import AsyncRouter from './AsyncRouter';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { DeleteRequest } from '../modules/departments/dto/DeleteRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';
import { DepartmentController } from '../modules/departments/department.controller';
import { DepartmentService } from '../modules/departments/department.service';
import { DepartmentRepository } from '../modules/departments/department.repository';
import { dataSource } from '../db';
import { IDepartmentController } from '../modules/departments/department.interface';
import { BaseRepository } from '../modules/BaseRepository';
import { Department } from '../modules/departments/department.schema';

class DepartmentRouter extends AsyncRouter {
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

export default new DepartmentRouter(
  new DepartmentController(
    new DepartmentService(
      new DepartmentRepository(
        new BaseRepository<Department>(Department, dataSource)
      )
    )
  )
).getRouter();
