'use strict';
import logger from '../config/logs/loggers.js';

//! Get - Render main page
export const mainRoute = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Redirecting to '/products'`);
  try {
    const { userImage, firstName, lastName, address, email } = req.user;
    const image = userImage.profilePicUrl;
    res.status(302).render('dashboard', { firstName, lastName, address, email, image });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
