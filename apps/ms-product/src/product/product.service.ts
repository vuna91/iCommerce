import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IProductRepository } from './product.repository';
import {
  Product,
  ProductCreation,
  ProductFilter,
  ProductSortBy,
} from './product.type';

export interface IProductService {
  getProducts(filer: ProductFilter, sortBy: ProductSortBy): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository
  ) {}

  public async getProducts(
    filter: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]> {
    return await this.productRepository.retrieve(filter, sortBy);
  }

  public async create(inputData: ProductCreation): Promise<Product> {
    return await this.productRepository.create(inputData);
  }
}
