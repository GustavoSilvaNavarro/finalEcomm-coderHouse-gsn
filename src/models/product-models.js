'use strict';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minLength: 1 },
    description: { type: String, required: true, trim: true, minLength: 1 },
    code: { type: String, required: true, trim: true, minLength: 1, uppercase: true },
    url: { type: String, required: true, trim: true, minLength: 1 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export default model('Products', ProductSchema);
