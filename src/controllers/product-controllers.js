'use strict';
//! Get all Products
export const getAllProductsData = (req, res, next) => {
  try {
    res.status(200).send('Dog');
  } catch (err) {
    next(err);
  }
};
