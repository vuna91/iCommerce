import { Schema, model, Document, Model } from 'mongoose';
import { transformDocument } from '../common/mongo';
import { Product } from './product.type';

export interface ProductDocument extends Omit<Product, 'id'>, Document {}

const productSchema = new Schema<ProductDocument>(
  {
    name: { type: Schema.Types.String, required: true },
    description: Schema.Types.String,
    price: { type: Schema.Types.Number, required: true },
    color: { type: Schema.Types.String, required: true },
    brand: {
      type: Schema.Types.String,
      required: true,
      ref: 'Brand',
    },
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
