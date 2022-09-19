'use strict';
import { Router } from 'express';

import {
  renderFormProductPage,
  addNewDataProduct,
  getDataFromDBToUpdate,
  updateDataProduct,
  deleteProduct,
} from '../../../../controllers/product-controllers.js';
import { upload } from '../../../../utils/upload-images/multer.js';
import { validateResources } from '../../../../middleware/validations/validate-resources.js';
import { productSchema } from '../../../../helpers/schemas/product-schema.js';

const router = Router();

//! GET Page to get products info
router.get('/', renderFormProductPage);

//! POST add new product to database
router.post('/', upload.single('productPicture'), validateResources(productSchema), addNewDataProduct);

//! Get Form page to update product by ID
router.get('/:id', getDataFromDBToUpdate);

//! PUT Update product by id
router.put('/:id', upload.single('productPicture'), validateResources(productSchema), updateDataProduct);

//! Delete product by its ID
router.delete('/:id', deleteProduct);

export default router;
