'use strict';
import logger from '../config/logs/loggers.js';

//! GET - Registration page
export const renderSignupPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Rendering signup page`);
  try {
    res.status(200).render('auth/signup');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! POST - Register new user
export const createNewUser = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Register process, creating new user`);
  try {
    console.log(req.session);
    res.status(302).redirect('/products');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! GET - Login page
export const renderLoginPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Rendering login page`);
  try {
    res.status(200).render('auth/login');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! POST - Login and authenticate the user
export const loginUserProcess = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Login process, authenticating user`);
  try {
    console.log(req.session);
    res.status(302).redirect('/products');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
