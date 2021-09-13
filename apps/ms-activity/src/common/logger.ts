import config from 'config';
import winston from 'winston';

const logger = winston.createLogger({
  level: config.get('logLevel') || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export default logger;
