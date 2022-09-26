'use strict';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    productsList: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        amountOrdered: { type: Number, min: 1 },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('Cart', CartSchema);
