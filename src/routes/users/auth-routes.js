'use strict';
import { Router } from 'express';
import passport from 'passport';

import {
  createNewUser,
  loginUserProcess,
  renderSignupPage,
  renderLoginPage,
} from '../../controllers/auth-controller.js';
import { upload } from '../../utils/upload-images/multer.js';
import { validateResources } from '../../middleware/validations/validate-resources.js';
import { authUserSchema, loginUserSchema } from '../../helpers/schemas/user-schemas.js';

const router = Router();

//! GET - Registration page
router.get('/signup', renderSignupPage);

//! POST - Register new user
router.post(
  '/signup',
  upload.single('userProfilePicture'),
  validateResources(authUserSchema),
  passport.authenticate('register', {
    failureRedirect: '/signup',
  }),
  createNewUser
);

//! GET - Login page
router.get('/login', renderLoginPage);

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
