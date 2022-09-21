'use strict';
import { Router } from 'express';

import { mainRoute } from '../controllers/main-controller.js';
import { userIsAuthenticate } from '../middleware/authentication/authentication.js';

const router = Router();

//! Get - Render main page
router.get('/', userIsAuthenticate, mainRoute);

export default router;
