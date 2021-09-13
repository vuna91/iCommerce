import 'reflect-metadata';
import TYPES from './type';

import { Container } from 'inversify';
import { RegistrableController } from './registerable.controller';
import { ActivityController } from '../../activity/activity.controller';
import {
  IActivityService,
  ActivityService,
} from '../../activity/activity.service';
import {
  IActivityRepository,
  ActivityRepository,
} from '../../activity/activity.repository';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(ActivityController);
container.bind<IActivityService>(TYPES.IActivityService).to(ActivityService);
container
  .bind<IActivityRepository>(TYPES.IActivityRepository)
  .to(ActivityRepository);

export default container;
