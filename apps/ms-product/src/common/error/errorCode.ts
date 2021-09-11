import { StatusCodes } from '../httpStatusCode';

enum ERROR_CODE {
  INVALID_DATA = 'INVALID_DATA',
}

const ErrorList = {
  [ERROR_CODE.INVALID_DATA]: {
    statusCode: StatusCodes.BAD_REQUEST,
  },
};

export { ERROR_CODE, ErrorList };
