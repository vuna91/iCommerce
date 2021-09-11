import { injectable } from 'inversify';
import { ProductModel } from './product.model';
import { Product, ProductCreation } from './product.type';

export interface IProductRepository {
  retrieve(): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  public async retrieve(): Promise<Product[]> {
    return await ProductModel.find({}).exec();
  }

  public async create(inputData: ProductCreation): Promise<Product> {
    return await ProductModel.create(inputData);
  }
}
