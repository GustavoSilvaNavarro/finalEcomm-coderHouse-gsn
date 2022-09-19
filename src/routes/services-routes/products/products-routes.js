'use strict';
import { Router } from 'express';

import { getAllProductsData, getOneProductData } from '../../../controllers/product-controllers.js';

const router = Router();

//! Get all Products
router.get('/', getAllProductsData);

//! Get one product data by id
router.get('/:id', getOneProductData);

export default router;
