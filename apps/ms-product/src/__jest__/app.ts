import express from 'express';
import container from '../common/ioc/inversify.config';
import TYPES from '../common/ioc/type';

import { RegistrableController } from '../common/ioc/registerable.controller';
import {
  errorHandler,
  routeNotFoundHandler,
} from '../common/error/errorHandler';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const controllers: RegistrableController[] =
  container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

app.use([errorHandler, routeNotFoundHandler]);

export default app;
