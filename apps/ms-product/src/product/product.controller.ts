import express from 'express';
import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { RegistrableController } from './../common/ioc/registerable.controller';
import { IProductService } from './product.service';

@injectable()
export class ProductController implements RegistrableController {
  constructor(
    @inject(TYPES.IProductService) private productService: IProductService
  ) {}

  public register(app: express.Application): void {
    app
      .route('/products')
      .get(
        async (
          _req: express.Request,
          res: express.Response,
          _next: express.NextFunction
        ) => {
          const result = await this.productService.retrieve();
          res.json({ result });
        }
      );
  }
}
