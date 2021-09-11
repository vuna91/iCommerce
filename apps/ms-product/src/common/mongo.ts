import config from 'config';
import { connection, connect } from 'mongoose';

export const connectDB = (): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    const dbName: string = config.get('dbConfig.name') || '';
    const dbUri: string = config.get('dbConfig.url') || '';
    const username: string = config.get('dbConfig.user') || '';
    const password: string = config.get('dbConfig.pass') || '';

    if (!dbName) {
      return reject(`No dbName is provided`);
    }

    connection.once('open', () => resolve());

    connection.on('error', err => {
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
