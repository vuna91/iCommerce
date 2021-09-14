import { injectable } from 'inversify';
import { BrandModel } from './brand.model';
import { Brand } from './brand.type';

export interface IBrandRepository {
  findById(brandId: string): Promise<Brand | null>;
}

@injectable()
export class BrandRepository implements IBrandRepository {
  public async findById(brandId: string): Promise<Brand | null> {
    return await BrandModel.findById(brandId).exec();
  }
}
