'use strict';
import logger from '../config/logs/loggers.js';

//! POST - Register new user
export const createNewUser = (req, res, next) => {
  logger.info(`${req.method} request to ${req.url} route: Register process, creating new user`);
  try {
    console.log(req.session);
    res.status(200).send('User was created successfully');
    // res.status(200).redirect('/');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//! POST - Login and authenticate the user
export const loginUser = (_req, res, next) => {
  try {
    res.status(200).redirect('/');
  } catch (err) {
    next(err);
  }
};
