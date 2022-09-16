'use strict';
import logger from '../config/logs/loggers.js';

//! Get - Render main page
export const mainRoute = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Redirecting to '/products'`);
  try {
    res.status(302).redirect('/products');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
