import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IProductRepository } from './product.repository';
import {
  Product,
  ProductCreation,
  ProductDetail,
  ProductFilter,
  ProductSortBy,
} from './product.type';
import { IActivityService } from '../activity/activity.service';
import { ActivityAction, ActivityResource } from '../activity/activity.type';
import { IBrandService } from '../brand/brand.service';
import { AppError } from './../common/error/appError';
import { ERROR_CODE } from '../common/error/errorCode';

export interface IProductService {
  getProducts(
    userId: string,
    filer: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]>;
  create(userId: string, inputData: ProductCreation): Promise<Product>;
  getDetails(userId: string, productId: string): Promise<ProductDetail>;
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IProductRepository)
    private productRepository: IProductRepository,
    @inject(TYPES.IActivityService)
    private activityService: IActivityService,
    @inject(TYPES.IBrandService)
    private brandService: IBrandService
  ) {}

  public async getProducts(
    userId: string,
    filter: ProductFilter,
    sortBy: ProductSortBy
  ): Promise<Product[]> {
    const products = await this.productRepository.retrieve(filter, sortBy);

    this.activityService.create({
      userId,
      resourceName: ActivityResource.PRODUCT,
      action: ActivityAction.GET_LIST,
      detail: `Get list of products with filter ${JSON.stringify(filter)}`,
    });

    return products;
  }

  public async create(
    userId: string,
    inputData: ProductCreation
  ): Promise<Product> {
    const brand = await this.brandService.getBrand(inputData.brand);
    if (!brand) {
      throw new AppError(
        ERROR_CODE.BRAND_IS_NOT_FOUND,
        `Cannot found brand ${inputData.brand}`
      );
    }

    const product = await this.productRepository.create(inputData);

    this.activityService.create({
      userId,
      resourceName: ActivityResource.PRODUCT,
      action: ActivityAction.CREATE,
      detail: `Create product with data ${JSON.stringify(inputData)}`,
    });

    return product;
  }

  public async getDetails(
    userId: string,
    productId: string
  ): Promise<ProductDetail> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError(
        ERROR_CODE.PRODUCT_IS_NOT_FOUND,
        `Cannot found brand ${productId}`
      );
    }

    this.activityService.create({
      userId,
      resourceId: productId,
      resourceName: ActivityResource.PRODUCT,
      action: ActivityAction.GET_DETAILS,
      detail: `Get product details of ${productId}`,
    });
    return product;
  }
}
