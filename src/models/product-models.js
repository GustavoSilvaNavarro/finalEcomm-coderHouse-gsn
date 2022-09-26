'use strict';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    productName: { type: String, required: true, trim: true, minLength: 1 },
    productDescription: { type: String, required: true, trim: true, minLength: 1 },
    productCode: { type: String, required: true, trim: true, minLength: 1, uppercase: true },
    categoryProduct: { type: String, required: true, trim: true, minLength: 1, lowercase: true },
    productPicture: {
      productPicUrl: { type: String },
      public_id: { type: String },
    },
    productPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export default model('Product', ProductSchema);
