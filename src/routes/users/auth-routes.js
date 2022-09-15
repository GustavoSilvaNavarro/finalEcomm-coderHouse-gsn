'use strict';
import { Router } from 'express';
import passport from 'passport';

import { createNewUser, loginUserProcess } from '../../controllers/auth-controller.js';
import { validateResources } from '../../middleware/validations/validate-resources.js';
import { authUserSchema, loginUserSchema } from '../../helpers/schemas/user-schemas.js';

const router = Router();

//! POST - Register new user
router.post(
  '/signup',
  validateResources(authUserSchema),
  passport.authenticate('register', {
    failureRedirect: '/signup',
  }),
  createNewUser
);

//! POST - Login and authenticate the user
router.post(
  '/login',
  validateResources(loginUserSchema),
  passport.authenticate('login', {
    failureRedirect: '/login',
  }),
  loginUserProcess
);

export default router;
