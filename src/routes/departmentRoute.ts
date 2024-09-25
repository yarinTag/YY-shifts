import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  patchDepartment,
} from '../modules/departments/department.controller';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/CreateRequest';
import { UpdateRequest } from '../modules/departments/dto/UpdateRequest';
import { GetByIdRequest } from '../modules/departments/dto/GetByIdRequest';

const router = Router();
router.get('/', getAllDepartments);
router.get('/:id', validationMiddleware(GetByIdRequest), getDepartmentById);
router.post('/', validationMiddleware(CreateRequest), createDepartment);
router.patch('/:id', validationMiddleware(UpdateRequest), patchDepartment);

export default router;
