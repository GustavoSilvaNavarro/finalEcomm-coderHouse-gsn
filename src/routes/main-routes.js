'use strict';
import { Router } from 'express';

import { mainRoute } from '../controllers/main-controller.js';

const router = Router();

//! Get - Render main page
router.get('/', mainRoute);

export default router;
