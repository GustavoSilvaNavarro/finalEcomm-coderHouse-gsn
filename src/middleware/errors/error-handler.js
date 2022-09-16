'use strict';
import { AppErrors } from '../../utils/errors/error-app.js';
import logger from '../../config/logs/loggers.js';

export const notFoundPage = (req, _res, next) => {
  logger.error(`${req.originalUrl} route does not exist`);
  const err = new AppErrors('Page not Found!', 404);
  next(err);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
};
