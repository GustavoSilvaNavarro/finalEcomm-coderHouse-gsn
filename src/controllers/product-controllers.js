'use strict';
import ProductMDB from '../api/container-crud/daos/products/productsMongo.js';

//! Get all Products
export const getAllProductsData = async (_req, res, next) => {
  try {
    const allProducts = await ProductMDB.getAllProducts();
    res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

//! POST add new product to database
export const addNewDataProduct = async (req, res, next) => {
  try {
    const idProduct = await ProductMDB.addProduct(req.body);
    res.status(200).json({ id: idProduct });
  } catch (err) {
    next(err);
  }
};

//! Get one product data by id
export const getOneProductData = async (req, res, next) => {
  try {
    const singleProduct = await ProductMDB.getAllProducts(req.params.id);
    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
};

//! PUT Update product by id
export const updateDataProduct = async (req, res, next) => {
  try {
    const response = await ProductMDB.updateProduct(req.params.id, req.body);
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
