import { injectable } from 'inversify';
import { FilterQuery } from 'mongoose';
import { ProductDocument, ProductModel } from './product.model';
import {
  Product,
  ProductCreation,
  ProductFilter,
  ProductSortBy,
} from './product.type';

export interface IProductRepository {
  retrieve(filter: ProductFilter, sortBy: ProductSortBy): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  public async retrieve(
    filter: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]> {
    const conditions: FilterQuery<ProductDocument> = {};
    if (filter.name) {
      conditions.name = new RegExp(filter.name, 'i');
    }
    if (filter.price) {
      conditions.price = filter.price;
    }
    if (filter.brand) {
      conditions.brand = filter.brand;
    }
    if (filter.color) {
      conditions.color = filter.color;
    }
    const query = ProductModel.find(conditions);

    if (sortBy.key) {
      query.sort({ [sortBy.key]: sortBy.value });
    }

    return await query.exec();
  }

  public async create(inputData: ProductCreation): Promise<Product> {
    return await ProductModel.create(inputData);
  }
}
