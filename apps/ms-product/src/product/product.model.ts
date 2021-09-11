import { Schema, model, Document, Model } from 'mongoose';
import { Product } from './product.type';

export interface ProductDocument extends Omit<Product, 'id'>, Document {}

function transformDocument(_doc: any, ret: { [key: string]: any }) {
  delete ret._id;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: String,
    description: String,
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

export const ProductModel: Model<ProductDocument> = model<ProductDocument>(
  'Product',
  productSchema
);
