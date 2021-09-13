import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IActivityRepository } from './activity.repository';
import { Activity, ActivityCreation } from './activity.type';

export interface IActivityService {
  getActivities(): Promise<Activity[]>;
  create(inputData: ActivityCreation): Promise<Activity>;
}

@injectable()
export class ActivityService implements IActivityService {
  constructor(
    @inject(TYPES.IActivityRepository)
    private activityRepository: IActivityRepository
  ) {}

  public async getActivities(): Promise<Activity[]> {
    return await this.activityRepository.retrieve();
  }

  public async create(inputData: ActivityCreation): Promise<Activity> {
    return await this.activityRepository.create(inputData);
  }
}
