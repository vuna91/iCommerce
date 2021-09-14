import { Request, Response, NextFunction } from 'express';

interface Handler<T, R extends Request> {
  (req: R, res: Response): Promise<T> | T;
}

interface CustomRequestHandler<T, R extends Request> {
  (req: R, res: Response, next: NextFunction): Promise<void | T>;
}

export const requestWrapper = <T, R extends Request>(
  handler: Handler<T, R>
): CustomRequestHandler<T, R> => {
  function asyncWrap(request: R, response: Response, next: NextFunction) {
    return Promise.resolve(handler(request, response)).catch(next);
  }
  return asyncWrap;
};
