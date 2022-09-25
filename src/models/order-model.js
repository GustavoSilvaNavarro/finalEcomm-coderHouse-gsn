'use strict';
import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    idBuyer: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    productsList: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
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

export default model('Orders', OrderSchema);