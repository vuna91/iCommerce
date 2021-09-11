import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IProductRepository } from './product.repository';
import { Product, ProductCreation } from './product.type';

export interface IProductService {
  retrieve(): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository
  ) {}

  public async retrieve(): Promise<Product[]> {
    return await this.productRepository.retrieve();
  }

  public async create(inputData: ProductCreation): Promise<Product> {
    return await this.productRepository.create(inputData);
  }
}
