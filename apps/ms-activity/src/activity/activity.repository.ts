import { injectable } from 'inversify';
import { ActivityModel } from './activity.model';
import { Activity, ActivityCreation } from './activity.type';

export interface IActivityRepository {
  retrieve(): Promise<Activity[]>;
  create(inputData: ActivityCreation): Promise<Activity>;
}

@injectable()
export class ActivityRepository implements IActivityRepository {
  public async retrieve(): Promise<Activity[]> {
    return await ActivityModel.find({}).sort({ createdAt: -1 }).exec();
  }

  public async create(inputData: ActivityCreation): Promise<Activity> {
    return await ActivityModel.create(inputData);
  }
}
