import { Router } from 'express';

import privateAdminRoutes from './admin/private-products-routes.js';
import { getAllProductsData, getOneProductData } from '../../../controllers/product-controllers.js';

const router = Router();

//! Get all Products
router.get('/', getAllProductsData);

//! Get one product data by id
router.get('/:id', getOneProductData);

//! Private admin routes
router.use('/', privateAdminRoutes);

export default router;
