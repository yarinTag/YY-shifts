import { Router } from 'express';
import { createUser, getAllUsers } from '../modules/users/user.controller';
import { userValidationRules, validate } from '../validationMiddleware';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users',userValidationRules(), validate,  createUser);
// router.get('/users/:id');

export default router;
