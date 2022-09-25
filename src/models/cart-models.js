'use strict';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    productsList: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        amountOrdered: { type: Number, min: 1 },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model('Carts', CartSchema);
