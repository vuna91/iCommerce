import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { Application, Request, Response } from 'express';
import { RegistrableController } from './../common/ioc/registerable.controller';
import { IProductService } from './product.service';
import { requestWrapper } from '../common/requestWrapper';
import { createValidator, ValidatedRequest } from 'express-joi-validation';
import {
  RetrieveProductRequestSchema,
  retrieveProductValidator,
} from './product.validator';
import { ProductFilter, ProductSortBy } from './product.type';
import { parseSortByQuery } from './product.util';

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
        validator.query(retrieveProductValidator),
        requestWrapper(
          async (
            req: ValidatedRequest<RetrieveProductRequestSchema>,
            res: Response
          ) => {
            const filer: ProductFilter = {
              name: req.query.name,
              price: req.query.price,
              brand: req.query.brand,
              color: req.query.color,
            };
            const sortBy: ProductSortBy = parseSortByQuery(
              req.query.sortBy || ''
            );
            const products = await this.productService.getProducts(
              filer,
              sortBy
            );
            res.json({ data: products });
          }
        )
      )
      .post(
        requestWrapper(async (req: Request, res: Response) => {
          const result = await this.productService.create(req.body);
          res.json({ result });
        })
      );
  }
}
