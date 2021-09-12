import config from 'config';
import logger from './common/logger';
import app from './app';

import { connectDB } from './common/mongo';

const initialize = async () => {
  await connectDB();

  const port = parseInt(config.get('port'), 10) || 3000;
  app.listen(port, () => {
    logger.info(`Started server on :${port} in ${process.env.NODE_ENV} mode`);
  });
};

initialize();
