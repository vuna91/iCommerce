import { StatusCodes } from '../httpStatusCode';

enum ERROR_CODE {
  INVALID_DATA = 'INVALID_DATA',
  BRAND_IS_NOT_FOUND = 'BRAND_IS_NOT_FOUND',
  PRODUCT_IS_NOT_FOUND = 'PRODUCT_IS_NOT_FOUND',
}

const ErrorList = {
  [ERROR_CODE.INVALID_DATA]: {
    statusCode: StatusCodes.BAD_REQUEST,
  },
  [ERROR_CODE.BRAND_IS_NOT_FOUND]: {
    statusCode: StatusCodes.BAD_REQUEST,
  },
  [ERROR_CODE.PRODUCT_IS_NOT_FOUND]: {
    statusCode: StatusCodes.BAD_REQUEST,
  },
};

export { ERROR_CODE, ErrorList };
