import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IProductRepository } from './product.repository';
import {
  Product,
  ProductCreation,
  ProductFilter,
  ProductSortBy,
} from './product.type';
import { IActivityService } from '../activity/activity.service';
import { ACTIVITY_ACTION, ACTIVITY_RESOURCES } from '../activity/activity.type';

export interface IProductService {
  getProducts(filer: ProductFilter, sortBy: ProductSortBy): Promise<Product[]>;
  create(inputData: ProductCreation): Promise<Product>;
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository,
    @inject(TYPES.IActivityService)
    private activityService: IActivityService
  ) {}

  public async getProducts(
    filter: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]> {
    const products = await this.productRepository.retrieve(filter, sortBy);

    this.activityService.create({
      resourceName: ACTIVITY_RESOURCES.PRODUCT,
      action: ACTIVITY_ACTION.GET_LIST,
      detail: `Get list of products with filter ${JSON.stringify(filter)}`,
    });

    return products;
  }

  public async create(inputData: ProductCreation): Promise<Product> {
    return await this.productRepository.create(inputData);
  }
}
