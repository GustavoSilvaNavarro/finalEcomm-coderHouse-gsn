'use strict';
import { Router } from 'express';

import privateAdminRoutes from './products/admin/private-products-routes.js';
import productsRoutes from './products/products-routes.js';
import cartsRoutes from './carts/cart-routes.js';

const router = Router();

//! ROUTES TO PRODUCTS
router.use('/products', productsRoutes);

//! Private admin routes
router.use('/api/products', privateAdminRoutes);

//! ROUTES TO CARTS
router.use('/api/carts', cartsRoutes);

export default router;
