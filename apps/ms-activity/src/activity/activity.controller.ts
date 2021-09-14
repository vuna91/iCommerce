import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { Application, Request, Response } from 'express';
import { RegistrableController } from '../common/ioc/registerable.controller';
import { IActivityService } from './activity.service';
import { requestWrapper } from '../common/requestWrapper';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import {
  ActivityCreationRequestSchema,
  activityCreationValidator,
} from './activity.validator';

const validator = createValidator({ passError: true });

@injectable()
export class ActivityController implements RegistrableController {
  constructor(
    @inject(TYPES.IActivityService) private activityService: IActivityService
  ) {}

  public register(app: Application): void {
    app
      .route('/activities')
      .get(
        requestWrapper(async (req: Request, res: Response) => {
          const activities = await this.activityService.getActivities();
          res.json({ data: activities });
        })
      )
      .post(
        validator.body(activityCreationValidator),
        requestWrapper(
          async (
            req: ValidatedRequest<ActivityCreationRequestSchema>,
            res: Response
          ) => {
            const activity = await this.activityService.create(req.body);
            res.json({ data: activity });
          }
        )
      );
  }
}
