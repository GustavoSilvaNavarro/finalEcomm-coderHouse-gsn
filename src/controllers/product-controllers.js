'use strict';
import ProductMDB from '../api/container-crud/daos/products/productsMongo.js';
import logger from '../config/logs/loggers.js';

//! Get all Products
export const getAllProductsData = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Getting all products from DB`);
  try {
    const allProducts = await ProductMDB.getAllProducts();
    res.status(200).json(allProducts);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//! POST add new product to database
export const addNewDataProduct = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Adding new product to DB`);
  try {
    const idProduct = await ProductMDB.addProduct(req.body);
    res.status(200).json({ id: idProduct });
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//! Get one product data by id
export const getOneProductData = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Getting all products from DB`);
  try {
    const singleProduct = await ProductMDB.getAllProducts(req.params.id);
    res.status(200).json(singleProduct);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//! PUT Update product by id
export const updateDataProduct = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Updating one product by its ID`);
  try {
    const response = await ProductMDB.updateProduct(req.params.id, req.body);
    res.status(200).send(response);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

//! Delete product by its ID
export const deleteProduct = async (req, res, next) => {
  logger.info(`${req.method} request to ${req.originalUrl} route: Deleting one product by its ID`);
  try {
    const result = await ProductMDB.deleteSingleProduct(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};
