import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../db';
import { Department } from '../modules/departments/department.schema';
import { ClientStatusCode } from '../types/enum/ClientStatusCode';
import { Role } from '../types/enum/Role';

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(ClientStatusCode.Unauthorized)
      .json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ''
    ) as jwt.JwtPayload;
    req.userId = user.id;
    req.userRole = user.role;
    req.departmentId = user.departmentId;

    next();
  } catch (err) {
    console.error(err);
    return res
      .status(ClientStatusCode.Unauthorized)
      .json({ message: 'Invalid token' });
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
    console.error(error);
    return null;
  }
}

export function RoleGuard(requiredRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = extractUserRole(req) as Role;

    if (!userRole) {
      return res
        .status(ClientStatusCode.Unauthorized)
        .json({ message: 'Unauthorized: No role found' });
    }

    if (!requiredRoles.includes(userRole)) {
      return res.status(ClientStatusCode.Forbidden).json({
        message: `Forbidden: Requires one of the following roles: ${requiredRoles.join(
          ', '
        )}`,
      });
    }
    req.userRole = userRole;
    next();
  };
}

export const checkDepartmentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const departmentId = req.departmentId;
  const isAcountAdmin = req.userRole === Role.ADMIN;

  if (isAcountAdmin) {
    return next();
  }

  if (!departmentId) {
    return res
      .status(ClientStatusCode.BadRequest)
      .json({ message: 'department id not found' });
  }

  try {
    const departmentRepository = dataSource.getRepository(Department);
    const department = await departmentRepository.findOne({
      where: { id: departmentId, active: true },
    });

    if (!department) {
      return res
        .status(ClientStatusCode.Forbidden)
        .json({ message: 'Invalid department' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res
      .status(ClientStatusCode.Unauthorized)
      .json({ message: 'Invalid token' });
  }
};
