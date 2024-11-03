import {NextFunction, Request, Response} from 'express';
import pinoHttpLogger from "../PinoHttpLogger";

export const httpLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
pinoHttpLogger(req,res);

next();
};
