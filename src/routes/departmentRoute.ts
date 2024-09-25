import { Router } from 'express';
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
} from '../modules/departments/department.controller';
import { validationMiddleware } from '../middlewares/validate';
import { CreateRequest } from '../modules/departments/dto/createRequest';
import { GetByIdRequest } from '../modules/departments/dto/getByIdRequest';

const router = Router();
router.get('/', getAllDepartments);

router.post('/', validationMiddleware(CreateRequest), createDepartment);
router.get('/:id', validationMiddleware(GetByIdRequest), getDepartmentById);

export default router;
