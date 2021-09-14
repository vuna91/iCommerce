import axios from 'axios';
import logger from './logger';

const httpClient = axios.create();

httpClient.interceptors.response.use(
  response => {
    logger.debug(
      `Received [${response.status}] status for request [${response.config.method}] ${response.config.url}`
    );
    return response;
  },
  error => {
    logger.debug(
      `Failed response from [${error.config.method}] ${error.config.url}. Response ${error.response}`,
      error
    );
    throw error;
  }
);

export default httpClient;
