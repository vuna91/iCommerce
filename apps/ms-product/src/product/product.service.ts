import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IProductRepository } from './product.repository';

export interface IProductService {
  retrieve(): Promise<string[]>;
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository
  ) {}

  public async retrieve(): Promise<string[]> {
    return await this.productRepository.retrieve();
  }
}
