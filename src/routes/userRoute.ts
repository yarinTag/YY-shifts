import { Router } from 'express';
import { createUser, getAllUsers } from '../modules/users/user.controller';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);
// router.get('/users/:id');

export default router;
