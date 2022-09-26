'use strict';
import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import mainRoutes from '../routes/main-routes.js';
import authUserRoutes from '../routes/users/auth-routes.js';
import clientServices from '../routes/services-routes/services-api-routes.js';
import env from '../utils/env/env-variables.js';
import { notFoundPage, errorHandler } from '../middleware/errors/error-handler.js';
import { passportSetupInitialize } from '../config/auth/passport.js';

const app = express();
passportSetupInitialize(passport);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, '../views'));
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
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
app.use(cors());

app.use('/', mainRoutes);
app.use('/', authUserRoutes);
app.use('/', clientServices);

app.use('*', notFoundPage);

app.use(errorHandler);

export default { app };
