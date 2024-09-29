import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../db';
import { Role } from '../modules/users/user.schema';
import { Department } from '../modules/departments/department.schema';

declare module 'express-serve-static-core' {
  interface Request {
    departmentId?: string;
    userRold?: Role;
    userId?: string;
  }
}

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ''
    ) as jwt.JwtPayload;
    req.userId = user.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

function extractUserRole(req: Request): string | null {
  const token = req.cookies['token'];
  if (!token) return null;

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ''
    ) as jwt.JwtPayload;
    req.departmentId = decodedToken.departmentId;
    return decodedToken.role;
  } catch (error) {
    return null;
  }
}

export function RoleGuard(requiredRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = extractUserRole(req) as Role;

    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role found' });
    }

    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Forbidden: Requires one of the following roles: ${requiredRoles.join(
          ', '
        )}`,
      });
    }
    req.userRold = userRole;
    next();
  };
}

export const checkDepartmentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const departmentId = req.departmentId;
  const isAcountAdmin = req.userRold === Role.Admin;

  if (!departmentId || !isAcountAdmin) {
    return res.status(403).json({ message: 'department id not found' });
  }

  try {
    const departmentRepository = dataSource.getRepository(Department);
    const department = await departmentRepository.findOne({
      where: { id: departmentId, active: true },
    });

    if (!department) {
      return res.status(403).json({ message: 'Invalid department' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
