import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { IBrandService } from '../brand.service';

describe('brand.service', () => {
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

  describe('getBrand', () => {
    it('should call brand repository correctly', async () => {
      // given
      const brandRepositoryMock = {
        findById: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IBrandRepository)
        .toConstantValue(brandRepositoryMock);

      // when
      const brandService = container.get<IBrandService>(TYPES.IBrandService);
      await brandService.getBrand('613f7c911de4f98a4bdda55d');

      // then
      expect(brandRepositoryMock.findById).toBeCalledWith(
        '613f7c911de4f98a4bdda55d'
      );
    });
  });
});
