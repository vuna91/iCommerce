import config from 'config';
import httpClient from '../common/httpClient';
import logger from '../common/logger';

import { get } from 'lodash';
import { injectable } from 'inversify';
import { Activity, ActivityCreation } from './activity.type';

export interface IActivityService {
  create(inputData: ActivityCreation): Promise<Activity>;
}

@injectable()
export class ActivityService implements IActivityService {
  private readonly activityServiceBaseUrl: string;

  constructor() {
    this.activityServiceBaseUrl = `${config.get('services.activity')}`;
  }

  public async create(inputData: ActivityCreation): Promise<Activity> {
    try {
      const response = await httpClient.post(
        `${this.activityServiceBaseUrl}/activities`,
        inputData
      );
      return response.data && response.data.data;
    } catch (err) {
      logger.error(`Create activity failed`, {
        code: get(err, 'code'),
        data: get(err, 'config.data'),
      });
      throw err;
    }
  }
}
