'use strict';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    products: { type: Schema.Types.ObjectId, ref: 'Products', default: [] },
  },
  {
    timestamps: true,
  }
);

export default model('Carts', CartSchema);
