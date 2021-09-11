import logger from '../logger';

import { ERROR_CODE, ErrorList } from './errorCode';

export class AppError extends Error {
  public errorCode: ERROR_CODE;
  message: string;
  constructor(errorCode: ERROR_CODE, message = '') {
    super(errorCode);
    this.errorCode = errorCode;
    this.name = AppError.name;
    this.message = message;
    this.log();
  }

  log(): void {
    logger.error(`Error code: ${this.errorCode} - Message: ${this.message}`);
  }

  getErrors(): {
    error: { errorCode: string; message: string };
    statusCode: number;
  } {
    const error = ErrorList[this.errorCode];
    return {
      error: {
        errorCode: this.errorCode,
        message: this.message,
      },
      statusCode: error.statusCode,
    };
  }
}
