import { Activity, ActivityResponse } from './activity.type';

export const toActivityResponse = (activity: Activity): ActivityResponse => {
  return {
    id: activity.id,
    userId: activity.userId,
    resourceId: activity.resourceId,
    resourceName: activity.resourceName,
    action: activity.action,
    detail: activity.detail,
    createdAt: activity.createdAt,
  };
};
