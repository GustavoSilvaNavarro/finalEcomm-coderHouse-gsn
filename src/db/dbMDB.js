import mongoose from 'mongoose';

import env from '../utils/env/env-variables.js';
import logger from '../config/logs/loggers.js';

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(env.dbName);

    logger.info(`DB is connected to ${db.connection.db.databaseName}`);
  } catch (err) {
    logger.error('Error linking the Data Base');
    logger.error(err.message);
    process.exit(1);
  }
};
