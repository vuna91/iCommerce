import { injectable } from 'inversify';
import { BrandModel } from './brand.model';
import { Brand } from './brand.type';

export interface IBrandRepository {
  retrieve(): Promise<Brand[]>;
}

@injectable()
export class BrandRepository implements IBrandRepository {
  public async retrieve(): Promise<Brand[]> {
    const result = await BrandModel.find({}).exec();
    return result;
  }
}
