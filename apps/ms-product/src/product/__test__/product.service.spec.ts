import { ActivityAction, ActivityResource } from '../../activity/activity.type';
import { ERROR_CODE } from '../../common/error/errorCode';
import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { IProductService } from '../product.service';
import { AppError } from './../../common/error/appError';

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

  describe('getProducts', () => {
    it('should call product repository and activity service correctly', async () => {
      // given
      const productRepositoryMock = {
        retrieve: jest.fn().mockResolvedValueOnce([]),
      };
      container
        .rebind(TYPES.IProductRepository)
        .toConstantValue(productRepositoryMock);

      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      await productService.getProducts(
        '613f7c911de4f98a4bdda55d',
        { name: 'iPhone' },
        { key: '', value: '' }
      );

      // then
      expect(productRepositoryMock.retrieve).toBeCalledWith(
        { name: 'iPhone' },
        { key: '', value: '' }
      );
      expect(activityServiceMock.create).toBeCalledWith({
        userId: '613f7c911de4f98a4bdda55d',
        resourceName: ActivityResource.PRODUCT,
        action: ActivityAction.GET_LIST,
        detail: `Get list of products with filter ${JSON.stringify({
          name: 'iPhone',
        })}`,
      });
    });
  });

  describe('create', () => {
    it('should call product repository and activity service correctly', async () => {
      // given
      const brandServiceMock = {
        getBrand: jest.fn().mockResolvedValueOnce({
          id: '613f242d82d0479055e95dcc',
          name: 'Apple',
        }),
      };
      container.rebind(TYPES.IBrandService).toConstantValue(brandServiceMock);

      const productRepositoryMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IProductRepository)
        .toConstantValue(productRepositoryMock);

      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      await productService.create('613f7c911de4f98a4bdda55d', {
        name: 'iPhone 12',
        price: 20490000,
        color: 'black',
        brand: '613f242d82d0479055e95dcc',
      });

      // then
      expect(brandServiceMock.getBrand).toBeCalledWith(
        '613f242d82d0479055e95dcc'
      );
      expect(productRepositoryMock.create).toBeCalledWith({
        name: 'iPhone 12',
        price: 20490000,
        color: 'black',
        brand: '613f242d82d0479055e95dcc',
      });
      expect(activityServiceMock.create).toBeCalledWith({
        userId: '613f7c911de4f98a4bdda55d',
        resourceName: ActivityResource.PRODUCT,
        action: ActivityAction.CREATE,
        detail: `Create product with data ${JSON.stringify({
          name: 'iPhone 12',
          price: 20490000,
          color: 'black',
          brand: '613f242d82d0479055e95dcc',
        })}`,
      });
    });

    it('should throw error if cannot found brand', async () => {
      // given
      const brandServiceMock = {
        getBrand: jest.fn().mockResolvedValueOnce(null),
      };
      container.rebind(TYPES.IBrandService).toConstantValue(brandServiceMock);

      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      const error = await productService
        .create('613f7c911de4f98a4bdda55d', {
          name: 'iPhone 12',
          price: 20490000,
          color: 'black',
          brand: '613f242d82d0479055e95dcc',
        })
        .catch(err => err);

      // then
      expect(brandServiceMock.getBrand).toBeCalledWith(
        '613f242d82d0479055e95dcc'
      );
      expect(error).toBeInstanceOf(AppError);
      expect(error.errorCode).toBe(ERROR_CODE.BRAND_IS_NOT_FOUND);
      expect(activityServiceMock.create).not.toBeCalled();
    });
  });

  describe('getDetails', () => {
    it('should call product repository and activity service correctly', async () => {
      // given
      const productRepositoryMock = {
        findById: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IProductRepository)
        .toConstantValue(productRepositoryMock);

      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      await productService.getDetails(
        '613f7c911de4f98a4bdda55d',
        '614073b6bf837048a13e8319'
      );

      // then
      expect(productRepositoryMock.findById).toBeCalledWith(
        '614073b6bf837048a13e8319'
      );
      expect(activityServiceMock.create).toBeCalledWith({
        userId: '613f7c911de4f98a4bdda55d',
        resourceId: '614073b6bf837048a13e8319',
        resourceName: ActivityResource.PRODUCT,
        action: ActivityAction.GET_DETAILS,
        detail: `Get product details of 614073b6bf837048a13e8319`,
      });
    });

    it('should throw error if cannot found product', async () => {
      // given
      const productRepositoryMock = {
        findById: jest.fn().mockResolvedValueOnce(null),
      };
      container
        .rebind(TYPES.IProductRepository)
        .toConstantValue(productRepositoryMock);

      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const productService = container.get<IProductService>(
        TYPES.IProductService
      );
      const error = await productService
        .getDetails('613f7c911de4f98a4bdda55d', '614073b6bf837048a13e8319')
        .catch(err => err);

      // then
      expect(productRepositoryMock.findById).toBeCalledWith(
        '614073b6bf837048a13e8319'
      );
      expect(error).toBeInstanceOf(AppError);
      expect(error.errorCode).toBe(ERROR_CODE.PRODUCT_IS_NOT_FOUND);
      expect(activityServiceMock.create).not.toBeCalled();
    });
  });
});
