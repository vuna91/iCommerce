import { Schema, model, Document, Model } from 'mongoose';
import { transformDocument } from '../common/mongo';
import { Brand } from './brand.type';

export interface BrandDocument extends Omit<Brand, 'id'>, Document {}

const brandSchema = new Schema<BrandDocument>(
  {
    name: { type: String, required: true },
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

export const BrandModel: Model<BrandDocument> = model<BrandDocument>(
  'Brand',
  brandSchema
);
