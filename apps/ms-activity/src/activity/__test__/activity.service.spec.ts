import container from '../../common/ioc/inversify.config';
import TYPES from '../../common/ioc/type';

import { IActivityService } from '../activity.service';

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

  describe('getActivities', () => {
    it('should call activity repository to get activities correctly', async () => {
      // given
      const activityRepositoryMock = {
        retrieve: jest.fn().mockResolvedValueOnce([]),
      };
      container
        .rebind(TYPES.IActivityRepository)
        .toConstantValue(activityRepositoryMock);

      // when
      const activityService = container.get<IActivityService>(
        TYPES.IActivityService
      );
      const activities = await activityService.getActivities();

      // then
      expect(activityRepositoryMock.retrieve).toBeCalledTimes(1);
      expect(activities).toEqual([]);
    });
  });

  describe('create', () => {
    it('should call activity repository to create activity correctly', async () => {
      // given
      const activityRepositoryMock = {
        create: jest.fn().mockResolvedValueOnce({}),
      };
      container
        .rebind(TYPES.IActivityRepository)
        .toConstantValue(activityRepositoryMock);

      // when
      const activityService = container.get<IActivityService>(
        TYPES.IActivityService
      );
      await activityService.create({
        userId: '614073df8efedc2619cc3acb',
        resourceId: '614073b6bf837048a13e8319',
        resourceName: 'PRODUCT',
        action: 'GET_DETAILS',
        detail: 'Get product details of 614073b6bf837048a13e8319',
      });

      // then
      expect(activityRepositoryMock.create).toBeCalledWith({
        userId: '614073df8efedc2619cc3acb',
        resourceId: '614073b6bf837048a13e8319',
        resourceName: 'PRODUCT',
        action: 'GET_DETAILS',
        detail: 'Get product details of 614073b6bf837048a13e8319',
      });
    });
  });
});
