import { Schema, model, Document, Model } from 'mongoose';
import { transformDocument } from '../common/mongo';
import { Activity } from './activity.type';

export interface ActivityDocument extends Omit<Activity, 'id'>, Document {}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.String, required: true },
    resourceId: Schema.Types.String,
    resourceName: { type: Schema.Types.String, required: true },
    action: { type: Schema.Types.String, required: true },
    detail: { type: Schema.Types.String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    toObject: {
      getters: true,
      versionKey: false,
      transform: transformDocument,
    },
    toJSON: {
      getters: true,
      versionKey: false,
      transform: transformDocument,
    },
  }
);

activitySchema.index({ resourceName: 'text', action: 'text' });

export const ActivityModel: Model<ActivityDocument> = model<ActivityDocument>(
  'Activity',
  activitySchema
);
