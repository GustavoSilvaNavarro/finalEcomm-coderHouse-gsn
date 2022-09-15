import { Router } from 'express';

import { getAllProductsData } from '../../../controllers/product-controllers.js';

const router = Router();

//! Get all Products
router.get('/', getAllProductsData);

export default router;
