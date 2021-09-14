import TYPES from '../common/ioc/type';

import { injectable, inject } from 'inversify';
import { IBrandRepository } from './brand.repository';
import { Brand } from './brand.type';

export interface IBrandService {
  getBrand(brandId: string): Promise<Brand | null>;
}

@injectable()
export class BrandService implements IBrandService {
  constructor(
    @inject(TYPES.IBrandRepository)
    private brandRepository: IBrandRepository
  ) {}

  public async getBrand(brandId: string): Promise<Brand | null> {
    return await this.brandRepository.findById(brandId);
  }
}
