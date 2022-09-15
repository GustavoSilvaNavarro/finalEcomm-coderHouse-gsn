'use strict';
import express from 'express';

import authUserRoutes from '../routes/users/auth-routes.js';

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', authUserRoutes);

export default { app };
