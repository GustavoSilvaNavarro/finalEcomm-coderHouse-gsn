'use strict';
import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    // buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    buyer: { type: String, required: true },
    productsList: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        amountOrdered: { type: Number, min: 1 },
        _id: false,
      },
    ],
    totalPrice: { type: Number, require: true, min: 0 },
    totalAmount: { type: Number, require: true, min: 1 },
  },
  {
    timestamps: true,
  }
);

export default model('Order', OrderSchema);
