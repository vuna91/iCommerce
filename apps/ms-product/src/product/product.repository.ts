import { injectable } from 'inversify';

export interface IProductRepository {
  retrieve(): Promise<string[]>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  public retrieve(): Promise<string[]> {
    return Promise.resolve(['1', '2', '3']);
  }
}
