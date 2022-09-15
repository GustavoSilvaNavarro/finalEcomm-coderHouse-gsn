'use strict';

import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';

import env from '../../utils/env/env-variables.js';

const customeFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.label({ label: process.pid }),
  format.errors({ stack: true }),
  format.printf(info => {
    return `${info.level.toUpperCase()} [${info.timestamp}] (${info.label}): ${info.stack || info.message}`;
  })
);

const loggerDev = () => {
  const devLog = createLogger({
    format: customeFormat,
    transports: [new transports.Console()],
  });

  return devLog;
};

const loggerProd = () => {
  const prodLog = createLogger({
    transports: [
      new transports.Console({
        format: customeFormat,
      }),
      new transports.MongoDB({
        level: 'warn',
        db: env.dbName,
        collection: 'debug-logs',
        options: {
          useUnifiedTopology: true,
        },
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
  });

  return prodLog;
};

let logger = null;

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.toLowerCase() === 'development') {
  logger = loggerDev();
} else {
  logger = loggerProd();
}

export default logger;
