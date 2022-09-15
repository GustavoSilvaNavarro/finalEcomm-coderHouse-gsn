'use strict';
import { object, string, number } from 'zod';

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
    url: string({
      required_error: 'URL picture photo',
    })
      .url({ message: 'URL must be valid' })
      .min(6, { message: 'Must be at least 6 or more characters long' })
      .trim(),
    productPrice: number({
      required_error: 'Price is required',
    }).nonnegative(0, { message: 'Price can not be 0 or lower' }),
    stock: number({
      required_error: 'Stock is required',
    })
      .nonnegative(0, { message: 'Stock can not be 0 or lower' })
      .int({ message: 'Stock only accepts integers ' }),
  }),
});
