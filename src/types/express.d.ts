import express from 'express';

declare global {
  namespace Express {
    interface Request {
      departmentId?: string;
      userRole?: Role;
      userId?: string;
    }
  }
}
