'use strict';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';

import authUserRoutes from '../routes/users/auth-routes.js';
import env from '../utils/env/env-variables.js';
import { notFoundPage, errorHandler } from '../middleware/errors/error-handler.js';
import { passportSetupInitialize } from '../config/auth/passport.js';

const app = express();
passportSetupInitialize(passport);

app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: env.dbName,
      ttl: 600,
      autoRemove: 'native',
    }),
    secret: env.secretKeySession,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      maxAge: 600000,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authUserRoutes);

app.use('*', notFoundPage);

app.use(errorHandler);

export default { app };
