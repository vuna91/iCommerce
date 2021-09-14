import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { Application, Response } from 'express';
import { RegistrableController } from './../common/ioc/registerable.controller';
import { IProductService } from './product.service';
import { requestWrapper } from '../common/requestWrapper';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import {
  productCreationBodyValidator,
  productCreationQueryValidator,
  ProductCreationRequestSchema,
  productGetDetailQueryValidator,
  ProductGetDetailRequestSchema,
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
            const products = await this.productService.getProducts(
              req.query.userId || '',
              filer,
              sortBy
            );
            res.json({ data: products.map(toProductResponse) });
          }
        )
      )
      .post(
        validator.query(productCreationQueryValidator),
        validator.body(productCreationBodyValidator),
        requestWrapper(
          async (
            req: ValidatedRequest<ProductCreationRequestSchema>,
            res: Response
          ) => {
            const result = await this.productService.create(
              req.query.userId,
              req.body
            );
            res.json({ data: toProductResponse(result) });
          }
        )
      );

    app.route('/products/:_id').get(
      validator.query(productGetDetailQueryValidator),
      requestWrapper(
        async (
          req: ValidatedRequest<ProductGetDetailRequestSchema>,
          res: Response
        ) => {
          const result = await this.productService.getDetails(
            req.query.userId,
            req.params._id
          );
          res.json({ data: toProductDetailResponse(result) });
        }
      )
    );
  }
}
