'use strict';
import CartMDB from '../api/container-crud/daos/carts/cartsMongo.js';
import logger from '../config/logs/loggers.js';

//!GET - See my cart list
export const renderCartList = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Rendering cart page`);
  try {
    //TODO - check the cart exist
    const response = await CartMDB.getCartInfo(req.user._id);

    const totalPrice = response.reduce((acc, current) => {
      return acc + current.product.productPrice * current.amountOrdered;
    }, 0);

    const totalAmount = response.reduce((acc, current) => {
      return acc + current.amountOrdered;
    }, 0);

    res.status(200).render('cart/new-cart', { response, totalPrice, totalAmount });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! PUT - Add an specific Product by ID to an specific Cart by userID
export const addProductsToCart = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Adding a product to the cart`);
  try {
    await CartMDB.addSingleProductToCart(req.user._id, req.params.idProduct, req.body); //TODO send message
    res.status(200).redirect('/api/carts');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! DELETE - Find specific cart by user ID and delete single product by ID
export const deleteSingleProduct = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting one product from Cart List`);
  try {
    await CartMDB.deleteOneProductFromCart(req.user._id, req.params.idProduct); //TODO send message
    res.status(200).redirect('/api/carts');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
