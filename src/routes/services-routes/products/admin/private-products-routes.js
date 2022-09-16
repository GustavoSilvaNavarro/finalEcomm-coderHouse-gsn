'use strict';
import { Router } from 'express';

import { addNewDataProduct, updateDataProduct, deleteProduct } from '../../../../controllers/product-controllers.js';
import { validateResources } from '../../../../middleware/validations/validate-resources.js';
import { productSchema } from '../../../../helpers/schemas/product-schema.js';

const router = Router();

//! POST add new product to database
router.post('/', validateResources(productSchema), addNewDataProduct);

//! PUT Update product by id
router.put('/:id', updateDataProduct);

//! Delete product by its ID
router.delete('/:id', deleteProduct);

export default router;
