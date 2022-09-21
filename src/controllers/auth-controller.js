'use strict';
import logger from '../config/logs/loggers.js';
import sendEmail from '../utils/mails/nodemailer.js';
import env from '../utils/env/env-variables.js';

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
export const createNewUser = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Register process, creating new user`);
  try {
    const mailOptions = {
      from: 'NodeJs Server',
      to: env.smtp.user,
      subject: 'New User was registered',
      html: `<h1>New User: ${req.user.firstName} ${req.user.lastName} with ${req.user.email} was registered</h1>`,
    };

    await sendEmail(mailOptions);

    res.status(302).redirect('/');
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
    res.status(302).redirect('/');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//!GET - Logout and render the page of logout
export const renderLogoutPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.url}' route: Logging out a user`);
  try {
    req.logout(err => {
      if (err) {
        throw err;
      }

      res.status(200).redirect('/login');
    });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
