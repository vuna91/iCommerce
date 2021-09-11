import { Request, Response, NextFunction } from 'express';

interface Handler<T, R extends Request> {
  (req: R, res: Response): Promise<T> | T;
}

interface CustomerRequestHandler<T, R extends Request> {
  (req: R, res: Response, next: NextFunction): Promise<void | T>;
}

export const requestWraper = <T, R extends Request>(
  handler: Handler<T, R>
): CustomerRequestHandler<T, R> => {
  function asyncWrap(request: R, response: Response, next: NextFunction) {
    return Promise.resolve(handler(request, response)).catch(next);
  }
  return asyncWrap;
};
