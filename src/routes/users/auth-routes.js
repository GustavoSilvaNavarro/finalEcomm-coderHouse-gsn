'use strict';
import { Router } from 'express';

import { createNewUser, loginUser } from '../../controllers/auth-controller.js';

const router = Router();

//! POST - Register new user
router.post('/signup', createNewUser);

//! POST - Login and authenticate the user
router.post('/login', loginUser);

export default router;
