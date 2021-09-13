import express from 'express';
import logger from './../logger';

import { AppError } from './appError';
import { ContainerTypes, ExpressJoiError } from 'express-joi-validation';

export function errorHandler(
  err: any | ExpressJoiError | AppError,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction // eslint-disable-line
): void {
  logger.debug(`err`, err);
  if (err && Object.values(ContainerTypes).includes(err.type)) {
    const e: ExpressJoiError = err;
    res.status(400).json(e);
  } else if (err && err instanceof AppError) {
    const formattedError = err.getErrors();
    res.status(formattedError.statusCode).json({ error: formattedError.error });
  } else {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).send(err);
    }
  }
}

export function routeNotFoundHandler(
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction // eslint-disable-line
): void {
  res
    .status(404)
    .json({ error: { message: 'The requested resource does not exist.' } });
}
