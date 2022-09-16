'use strict';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    idBuyer: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    date: { type: Date, required: true, default: Date.now },
    productsList: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Products' },
        amountOrdered: { type: Number, min: 0 },
      },
    ],
    address: { type: String, required: true, trim: true, minLength: 1 },
  },
  {
    timestamps: true,
  }
);

export default model('Carts', CartSchema);
