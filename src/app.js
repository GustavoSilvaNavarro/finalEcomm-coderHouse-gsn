'use strict';
import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';

import logger from './config/logs/loggers.js';
import connectionToServer from './server/server.js';
import { connectDB } from './db/dbMDB.js';

const cpus = os.cpus();
const mode = 'fork';

const { app } = connectionToServer;
connectDB();

if (mode === 'cluster' && cluster.isPrimary) {
  // if it is not the main process creates workers
  cpus.map(() => {
    cluster.fork();
  });

  // In case a worker died
  cluster.on('exit', worker => {
    logger.warn(`Worker with ID ${worker.process.pid} crushed`);
    cluster.fork();
  });
} else {
  // once they are created since they are not the main process they will listen the server in the port 8080
  app.listen(app.get('port'), () => {
    logger.info(`Server on Port: ${app.get('port')} - Worker: ${process.pid}`);
  });
}
