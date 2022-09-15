import { Router } from 'express';

import productsRoutes from './products/products-routes.js';

const router = Router();

//! ROUTES TO PRODUCTS
router.use('/products', productsRoutes);

//! ROUTES TO CARTS

export default router;
