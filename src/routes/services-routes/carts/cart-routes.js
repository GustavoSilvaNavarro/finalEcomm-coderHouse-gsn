'use strict';
import { Router } from 'express';

import {
  renderCartList,
  addProductsToCart,
  deleteSingleProduct,
  setNewOrder,
} from '../../../controllers/cart-controller.js';

const router = Router();

//!GET - See my cart list
router.get('/', renderCartList);

//! PUT - Add an specific Product by ID to an specific Cart by userID
router.put('/:idProduct', addProductsToCart);

//! DELETE - Find specific cart by user ID and delete single product by ID
router.delete('/:idProduct', deleteSingleProduct);

//! POST - Set new order and delete temporary cart to save the order
router.post('/newOrder', setNewOrder);

export default router;
