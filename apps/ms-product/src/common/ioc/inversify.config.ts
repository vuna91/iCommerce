import TYPES from './type';

import { Container } from 'inversify';
import { RegistrableController } from './registerable.controller';
import { ProductController } from './../../product/product.controller';
import { IProductService, ProductService } from '../../product/product.service';
import {
  IProductRepository,
  ProductRepository,
} from './../../product/product.repository';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(ProductController);
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container
  .bind<IProductRepository>(TYPES.IProductRepository)
  .to(ProductRepository);

export default container;
