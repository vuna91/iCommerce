import { injectable } from 'inversify';
import { FilterQuery } from 'mongoose';
import { ActivityDocument, ActivityModel } from './activity.model';
import { Activity, ActivityCreation } from './activity.type';

export interface IActivityRepository {
  retrieve(): Promise<Activity[]>;
  create(inputData: ActivityCreation): Promise<Activity>;
}

@injectable()
export class ActivityRepository implements IActivityRepository {
  public async retrieve(): Promise<Activity[]> {
    return await ActivityModel.find({}).exec();
  }

  public async create(inputData: ActivityCreation): Promise<Activity> {
    return await ActivityModel.create(inputData);
  }
}
