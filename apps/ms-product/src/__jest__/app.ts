import express from 'express';
import container from '../common/ioc/inversify.config';
import TYPES from '../common/ioc/type';

import { RegistrableController } from '../common/ioc/registerable.controller';
import {
  errorHandler,
  routeNotFoundHandler,
} from '../common/error/errorHandler';

export const registerApp = (controllerName: symbol): express.Express => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const controller: RegistrableController =
    container.getNamed<RegistrableController>(TYPES.Controller, controllerName);
  controller.register(app);

  app.use([errorHandler, routeNotFoundHandler]);
  return app;
};
