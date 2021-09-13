import express from 'express';
import container from './common/ioc/inversify.config';
import TYPES from './common/ioc/type';
import swaggerMiddleware from './common/swagger';

import {
  errorHandler,
  routeNotFoundHandler,
} from './common/error/errorHandler';
import { RegistrableController } from './common/ioc/registerable.controller';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', ...swaggerMiddleware);

const controllers: RegistrableController[] =
  container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

app.use([errorHandler, routeNotFoundHandler]);

export default app;
