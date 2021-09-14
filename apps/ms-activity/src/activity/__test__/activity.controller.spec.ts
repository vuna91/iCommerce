import request from 'supertest';
import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { registerApp } from '../../__jest__/app';

describe('activity.controller', () => {
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

  describe('GET /activities', () => {
    it('should call service to get activities and return response correctly', async () => {
      // given
      const data = {
        id: '614073df8efedc2619cc3aca',
        userId: '614073df8efedc2619cc3acb',
        resourceId: '614073b6bf837048a13e8319',
        resourceName: 'PRODUCT',
        action: 'GET_DETAILS',
        detail: 'Get product details of 614073b6bf837048a13e8319',
        createdAt: '2021-09-14T10:05:19.832+0000',
        updatedAt: '2021-09-14T10:05:19.832+0000',
      };
      const activityServiceMock = {
        getActivities: jest.fn().mockResolvedValueOnce([data]),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const response = await request(registerApp(TYPES.ActivityController)).get(
        '/activities'
      );

      // then
      expect(activityServiceMock.getActivities).toHaveBeenCalledTimes(1);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [{ ...data, updatedAt: undefined }],
      });
    });
  });

  describe('POST /activities', () => {
    it('should call service to create a activity and return response correctly', async () => {
      // given
      const activityServiceMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityService)
        .toConstantValue(activityServiceMock);

      // when
      const response = await request(registerApp(TYPES.ActivityController))
        .post('/activities')
        .send({
          userId: '614073df8efedc2619cc3acb',
          resourceId: '614073b6bf837048a13e8319',
          resourceName: 'PRODUCT',
          action: 'GET_DETAILS',
          detail: 'Get product details of 614073b6bf837048a13e8319',
        });

      // then
      expect(activityServiceMock.create).toBeCalledWith({
        userId: '614073df8efedc2619cc3acb',
        resourceId: '614073b6bf837048a13e8319',
        resourceName: 'PRODUCT',
        action: 'GET_DETAILS',
        detail: 'Get product details of 614073b6bf837048a13e8319',
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ data: {} });
    });

    it('should return error response if request body is invalid', async () => {
      // when
      const response = await request(registerApp(TYPES.ActivityController))
        .post('/activities')
        .send({});

      // then
      expect(response.status).toBe(400);
      expect(response.body.error.isJoi).toBe(true);
      expect(response.body.error.name).toBe('ValidationError');
    });
  });
});
