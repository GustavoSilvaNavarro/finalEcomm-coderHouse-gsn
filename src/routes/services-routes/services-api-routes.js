'use strict';
import { Router } from 'express';

import privateAdminRoutes from './products/admin/private-products-routes.js';
import productsRoutes from './products/products-routes.js';
import cartsRoutes from './carts/cart-routes.js';
import { userIsAuthenticate } from '../../middleware/authentication/authentication.js';
import { areYouAnAdmin } from '../../middleware/authentication/isAdmin.js';

const router = Router();

//! ROUTES TO PRODUCTS
router.use('/products', userIsAuthenticate, productsRoutes);

//! Private admin routes
router.use('/api/products', userIsAuthenticate, areYouAnAdmin, privateAdminRoutes);

//! ROUTES TO CARTS
router.use('/api/carts', userIsAuthenticate, cartsRoutes);

export default router;
