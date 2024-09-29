import express from 'express';
import { Role } from '../modules/users/user.schema';

declare global {
  namespace Express {
    interface Request {
      departmentId?: string;
      userRole?: Role;
      userId?: string;
    }
  }
}
