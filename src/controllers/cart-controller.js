'use strict';
import CartMDB from '../api/container-crud/daos/carts/cartsMongo.js';
import logger from '../config/logs/loggers.js';

export const createNewCart = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Creating new cart`);
  try {
    const idCart = await CartMDB.addNewCart();
    res.status(200).json({ id: idCart });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
