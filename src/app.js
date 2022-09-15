'use strict';
import 'dotenv/config';

import logger from './config/logs/loggers.js';
import connectionToServer from './server/server.js';
import { connectDB } from './db/dbMDB.js';

const { app } = connectionToServer;
connectDB();

app.listen(app.get('port'), () => {
  logger.info(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
});
