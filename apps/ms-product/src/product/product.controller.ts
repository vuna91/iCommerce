import express from 'express';
import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { RegistrableController } from './../common/ioc/registerable.controller';
import { IProductService } from './product.service';
import { requestWraper } from '../common/requestWraper';

@injectable()
export class ProductController implements RegistrableController {
  constructor(
    @inject(TYPES.IProductService) private productService: IProductService
  ) {}

  public register(app: express.Application): void {
    app
      .route('/products')
      .get(
        requestWraper(async (_req: express.Request, res: express.Response) => {
          const result = await this.productService.retrieve();
          res.json({ result });
        })
      )
      .post(
        requestWraper(async (req: express.Request, res: express.Response) => {
          const result = await this.productService.create(req.body);
          res.json({ result });
        })
      );
  }
}
