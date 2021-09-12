import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { IProductService } from '../product.service';

describe('product.service', () => {
  beforeEach(() => {
    // create a snapshot so each unit test can modify
    // it without breaking other unit tests
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    // Restore to last snapshot so each unit test
    // takes a clean copy of the application container
    container.restore();
  });

  describe('retrieve', () => {
    it('should call repository correctly', async () => {
      // given
      const productRepositoryMock = {
        retrieve: jest.fn().mockResolvedValueOnce([]),
      };
      container.unbind(TYPES.IProductRepository);
      container
        .bind(TYPES.IProductRepository)
        .toConstantValue(productRepositoryMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      await productService.retrieve({}, { key: '', value: '' });

      // then
      expect(productRepositoryMock.retrieve).toBeCalledWith(
        {},
        { key: '', value: '' }
      );
    });
  });
});
