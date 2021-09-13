import request from 'supertest';
import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { registerApp } from '../../__jest__/app';

describe('product.controller', () => {
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

  describe('GET /products', () => {
    it('should call service and return response correctly', async () => {
      // given
      const productServiceMock = {
        getProducts: jest.fn().mockResolvedValueOnce([]),
      };
      container
        .rebind(TYPES.IProductService)
        .toConstantValue(productServiceMock);

      // when
      const response = await request(registerApp(TYPES.ProductController)).get(
        '/products?name=_productName&price=100&sortBy=createdDate:desc'
      );

      // then
      expect(productServiceMock.getProducts).toBeCalledWith(
        { name: '_productName', price: 100 },
        { key: 'createdDate', value: 'desc' }
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ data: [] });
    });

    it('should return error response if query in invalid', async () => {
      // when
      const response = await request(registerApp(TYPES.ProductController)).get(
        '/products?invalidName=_productName'
      );

      // then
      expect(response.status).toBe(400);
      expect(response.body.error.isJoi).toBe(true);
      expect(response.body.error.name).toBe('ValidationError');
    });
  });
});
