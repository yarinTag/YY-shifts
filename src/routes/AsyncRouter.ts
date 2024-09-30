import { Router, RequestHandler, ErrorRequestHandler } from 'express';
import { asyncWrapper } from '../middlewares/error/asyncErrorHandler';

class AsyncRouter {
  private router = Router();

  constructor() {}

  public get(path: string, ...handlers: Array<RequestHandler>) {
    return this.router.get(path, ...handlers.map(asyncWrapper));
  }

  public post(path: string, ...handlers: Array<RequestHandler>) {
    return this.router.post(path, ...handlers.map(asyncWrapper));
  }

  public patch(path: string, ...handlers: Array<RequestHandler>) {
    return this.router.patch(path, ...handlers.map(asyncWrapper));
  }

  public delete(path: string, ...handlers: Array<RequestHandler>) {
    return this.router.delete(path, ...handlers.map(asyncWrapper));
  }

  public use(
    path: string | RegExp,
    ...handlers: Array<RequestHandler | ErrorRequestHandler>
  ): this;

  public use(...handlers: Array<RequestHandler | ErrorRequestHandler>): this;

  public use(
    pathOrHandler: string | RegExp | RequestHandler | ErrorRequestHandler,
    ...handlers: Array<RequestHandler | ErrorRequestHandler>
  ): this {
    if (typeof pathOrHandler === 'string' || pathOrHandler instanceof RegExp) {
      this.router.use(pathOrHandler, ...handlers);
    } else {
      this.router.use(pathOrHandler, ...handlers);
    }

    return this;
  }

  public getRouter() {
    return this.router;
  }
}
export default AsyncRouter;
