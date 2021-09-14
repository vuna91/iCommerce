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
    it('should call service to get products and return response correctly', async () => {
      // given
      const data = {
        id: '613f7c911de4f98a4bdda55d',
        name: 'iPhone 12',
        description: 'the description of iPhone 12',
        price: 20490000,
        color: 'black',
        brand: '613f242d82d0479055e95dcc',
        createdAt: '2021-09-13T16:30:09.180Z',
        updatedAt: '2021-09-13T16:30:09.180Z',
      };
      const productServiceMock = {
        getProducts: jest.fn().mockResolvedValueOnce([data]),
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
        '613f7c911de4f98a4bdda55d',
        { name: '_productName', price: 100 },
        { key: 'createdDate', value: 'desc' }
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [{ ...data, description: undefined }],
      });
    });

    it('should return error response if query is invalid', async () => {
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

  describe('POST /products', () => {
    it('should call service to create a product and return response correctly', async () => {
      // given
      const productServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IProductService)
        .toConstantValue(productServiceMock);

      // when
      const response = await request(registerApp(TYPES.ProductController))
        .post('/products')
        .send({
          name: 'iPhone 12',
          price: 20490000,
          color: 'black',
          brand: '613f242d82d0479055e95dcc',
        });

      // then
      expect(productServiceMock.create).toBeCalledWith(
        '613f7c911de4f98a4bdda55d',
        {
          name: 'iPhone 12',
          price: 20490000,
          color: 'black',
          brand: '613f242d82d0479055e95dcc',
        }
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ data: {} });
    });

    it('should return error response if request body is invalid', async () => {
      // when
      const response = await request(registerApp(TYPES.ProductController))
        .post('/products')
        .send({});

      // then
      expect(response.status).toBe(400);
      expect(response.body.error.isJoi).toBe(true);
      expect(response.body.error.name).toBe('ValidationError');
    });
  });

  describe('GET /products/:_id', () => {
    it('should call service to get product details and return response correctly', async () => {
      // given
      const data = {
        id: '613f7c911de4f98a4bdda55d',
        name: 'iPhone 12',
        description: 'the description of iPhone 12',
        price: 20490000,
        color: 'black',
        brand: {
          id: '613f242d82d0479055e95dcc',
          name: 'Apple',
          createdAt: '2021-09-13T16:30:09.180Z',
          updatedAt: '2021-09-13T16:30:09.180Z',
        },
        createdAt: '2021-09-13T16:30:09.180Z',
        updatedAt: '2021-09-13T16:30:09.180Z',
      };
      const productServiceMock = {
        getDetails: jest.fn().mockResolvedValueOnce(data),
      };
      container
        .rebind(TYPES.IProductService)
        .toConstantValue(productServiceMock);

      // when
      const response = await request(registerApp(TYPES.ProductController)).get(
        '/products/614073b6bf837048a13e8319'
      );

      // then
      expect(productServiceMock.getDetails).toBeCalledWith(
        '613f7c911de4f98a4bdda55d',
        '614073b6bf837048a13e8319'
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: {
          id: '613f7c911de4f98a4bdda55d',
          name: 'iPhone 12',
          description: 'the description of iPhone 12',
          price: 20490000,
          color: 'black',
          brand: {
            id: '613f242d82d0479055e95dcc',
            name: 'Apple',
          },
          createdAt: '2021-09-13T16:30:09.180Z',
          updatedAt: '2021-09-13T16:30:09.180Z',
        },
      });
    });
  });
});
