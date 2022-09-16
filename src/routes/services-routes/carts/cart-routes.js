'use strict';
import { Router } from 'express';

import { createNewCart } from '../../../controllers/cart-controller.js';

const router = Router();

//! POST - Create new cart
router.post('/', createNewCart);

export default router;
