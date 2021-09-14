import config from 'config';
import { connection, connect } from 'mongoose';
import logger from './logger';

export const connectDB = (): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const dbName: string = config.get('dbConfig.name') || '';
    const dbUri: string = config.get('dbConfig.url') || '';
    const username: string = config.get('dbConfig.user') || '';
    const password: string = config.get('dbConfig.pass') || '';

    if (!dbName) {
      return reject('No dbName is provided');
    }

    connection.once('open', () => resolve());

    connection.on('error', err => {
      logger.error('Error when connecting to database', err);
      reject(err);
    });

    connect(dbUri, {
      dbName,
      auth: {
        username,
        password,
      },
    });
  });

export function transformDocument(
  _doc: any,
  ret: { [key: string]: any }
): void {
  delete ret._id;
}
