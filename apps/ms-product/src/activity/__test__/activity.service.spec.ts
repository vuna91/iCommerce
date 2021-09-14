import config from 'config';
import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { ActivityAction, ActivityResource } from '../../activity/activity.type';
import { IActivityService } from '../activity.service';
import httpClient from '../../common/httpClient';
import logger from './../../common/logger';

jest.mock('../../common/httpClient', () => {
  const origin = jest.requireActual('../../common/httpClient');
  return {
    ...origin,
    post: jest.fn(),
  };
});

describe('activity.service', () => {
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

  describe('create', () => {
    it('should create activity via API call', async () => {
      // given
      const inputData = {
        userId: '613f7c911de4f98a4bdda55e',
        resourceName: ActivityResource.PRODUCT,
        action: ActivityAction.CREATE,
        detail: `Create product with data {}`,
      };
      (httpClient.post as jest.Mock).mockResolvedValueOnce({
        data: { data: {} },
      });

      // when
      const activityService = container.get<IActivityService>(
        TYPES.IActivityService
      );
      await activityService.create(inputData);

      // then
      expect(httpClient.post).toBeCalledWith(
        `${config.get('services.activity')}/activities`,
        inputData
      );
    });

    it('should log error if API call failed', async () => {
      // given
      const inputData = {
        userId: '613f7c911de4f98a4bdda55e',
        resourceName: ActivityResource.PRODUCT,
        action: ActivityAction.CREATE,
        detail: `Create product with data {}`,
      };
      const expectedData = { ...inputData };
      (httpClient.post as jest.Mock).mockRejectedValueOnce({
        config: {
          url: 'http://localhost:3001/activities',
          method: 'post',
          data: inputData,
        },
      });
      const loggerError = jest.spyOn(logger, 'error');

      // when
      const activityService = container.get<IActivityService>(
        TYPES.IActivityService
      );
      await activityService.create(inputData).catch(err => err);

      // then
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith('Create activity failed', {
        data: expectedData,
      });
    });
  });
});
