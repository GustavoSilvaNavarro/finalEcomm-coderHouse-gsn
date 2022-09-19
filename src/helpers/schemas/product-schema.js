'use strict';
import { object, string } from 'zod';

export const productSchema = object({
  body: object({
    productName: string({
      required_error: 'Product name is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    productDescription: string({
      required_error: 'Product description is required',
    })
      .min(8, { message: 'Must be at least 8 or more characters long' })
      .trim(),
    productCode: string({
      required_error: 'Product code is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    categoryProduct: string({
      required_error: 'Category product is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    productPrice: string({
      required_error: 'Price is required',
    })
      .min(1, { message: 'Price must be at least 1 or more characters long' })
      .refine(val => !isNaN(Number(val)), {
        message: 'Price must be a number',
      })
      .refine(val => Number(val) > 0, {
        message: 'Price can not be 0 or lower',
      }),
    stock: string({
      required_error: 'Stock is required',
    })
      .min(1, { message: 'Stock must be at least 1 or more characters long' })
      .refine(val => !isNaN(Number(val)), {
        message: 'Stock must be a number',
      })
      .refine(val => Number.isInteger(Number(val)), {
        message: 'Stock must be an integer',
      })
      .refine(val => Number(val) > 0, {
        message: 'Price can not be 0 or lower',
      }),
  }),
});
