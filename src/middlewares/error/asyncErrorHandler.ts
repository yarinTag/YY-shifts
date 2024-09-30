import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError } from './ApiError';

export function asyncWrapper(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({
    message: err.message ?? 'Internal Server Error',
  });
};
