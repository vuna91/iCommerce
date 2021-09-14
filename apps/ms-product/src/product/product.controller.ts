import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { Application, Request, Response } from 'express';
import { RegistrableController } from './../common/ioc/registerable.controller';
import { IProductService } from './product.service';
import { requestWrapper } from '../common/requestWrapper';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import {
  productCreationBodyValidator,
  ProductCreationRequestSchema,
  ProductGetListRequestSchema,
  productGetListValidator,
} from './product.validator';
import { ProductFilter, ProductSortBy } from './product.type';
import {
  parseSortByQuery,
  toProductDetailResponse,
  toProductResponse,
} from './product.util';

const validator = createValidator({ passError: true });

@injectable()
export class ProductController implements RegistrableController {
  constructor(
    @inject(TYPES.IProductService) private productService: IProductService
  ) {}

  public register(app: Application): void {
    app
      .route('/products')
      .get(
        validator.query(productGetListValidator),
        requestWrapper(
          async (
            req: ValidatedRequest<ProductGetListRequestSchema>,
            res: Response
          ) => {
            const filer: ProductFilter = {
              name: req.query.name,
              price: req.query.price,
              brand: req.query.brand,
              color: req.query.color,
            };
            const sortBy: ProductSortBy = parseSortByQuery(req.query.sortBy);
            const userId = '613f7c911de4f98a4bdda55d'; // userId will be replaced by id of user get from token
            const products = await this.productService.getProducts(
              userId,
              filer,
              sortBy
            );
            res.json({ data: products.map(toProductResponse) });
          }
        )
      )
      .post(
        validator.body(productCreationBodyValidator),
        requestWrapper(
          async (
            req: ValidatedRequest<ProductCreationRequestSchema>,
            res: Response
          ) => {
            const userId = '613f7c911de4f98a4bdda55d'; // userId will be replaced by id of user get from token
            const result = await this.productService.create(userId, req.body);
            res.json({ data: toProductResponse(result) });
          }
        )
      );

    app.route('/products/:_id').get(
      requestWrapper(async (req: Request, res: Response) => {
        const userId = '613f7c911de4f98a4bdda55d'; // userId will be replaced by id of user get from token
        const result = await this.productService.getDetails(
          userId,
          req.params._id
        );
        res.json({ data: toProductDetailResponse(result) });
      })
    );
  }
}
