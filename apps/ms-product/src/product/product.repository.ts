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
  retrieve(filer: ProductFilter, sortBy: ProductSortBy): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  public async retrieve(
    filer: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]> {
    const conditions: FilterQuery<ProductDocument> = {};
    if (filer.name) {
      conditions.name = new RegExp(filer.name, 'i');
    }
    if (filer.price) {
      conditions.price = filer.price;
    }
    if (filer.brand) {
      conditions.brand = filer.brand;
    }
    if (filer.color) {
      conditions.color = filer.color;
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
