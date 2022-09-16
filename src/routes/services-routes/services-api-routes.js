'use strict';
import { Router } from 'express';

import productsRoutes from './products/products-routes.js';
import cartsRoutes from './carts/cart-routes.js';

const router = Router();

//! ROUTES TO PRODUCTS
router.use('/products', productsRoutes);

//! ROUTES TO CARTS
router.use('/carts', cartsRoutes);

export default router;
