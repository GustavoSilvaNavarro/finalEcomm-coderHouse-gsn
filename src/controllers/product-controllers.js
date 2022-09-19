'use strict';
import ProductMDB from '../api/container-crud/daos/products/productsMongo.js';
import logger from '../config/logs/loggers.js';

//! Get all Products
export const getAllProductsData = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Getting all products from DB`);
  try {
    const allProducts = await ProductMDB.getAllProducts();
    res.status(200).render('products/allProducts', { allProducts });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! GET Page to get products info
export const renderFormProductPage = (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Render form page to create a new product`);
  try {
    res.status(200).render('products/form-product');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! POST add new product to database
export const addNewDataProduct = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Adding new product to DB`);
  try {
    const idProduct = await ProductMDB.addProduct(req.body, req.file);
    res.status(200).redirect(`/products/${idProduct}`);
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! Get one product data by id
export const getOneProductData = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Getting all products from DB`);
  try {
    const singleProduct = await ProductMDB.getAllProducts(req.params.id);
    res.status(200).render('products/single-product', { singleProduct });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! Get Form page to update product by ID
export const getDataFromDBToUpdate = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Render form page to update`);
  try {
    const productDetail = await ProductMDB.getAllProducts(req.params.id);
    console.log(productDetail);
    res.status(200).render('products/edit-product', { productDetail });
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! PUT Update product by id
export const updateDataProduct = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Updating one product by its ID`);
  try {
    // const response = await ProductMDB.updateProduct(req.params.id, req.body, req.file); //TODO: find a way to send the message to client
    await ProductMDB.updateProduct(req.params.id, req.body, req.file);
    // res.status(200).send(response);
    res.status(200).redirect(`/products/${req.params.id}`);
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};

//! Delete product by its ID
export const deleteProduct = async (req, res, next) => {
  logger.info(`${req.method} request to '${req.originalUrl}' route: Deleting one product by its ID`);
  try {
    // const result = await ProductMDB.deleteSingleProduct(req.params.id); //TODO: find a way to send the message to client
    await ProductMDB.deleteSingleProduct(req.params.id);
    res.status(200).redirect('/products');
  } catch (err) {
    logger.error(err.message || err.toString());
    next(err);
  }
};
