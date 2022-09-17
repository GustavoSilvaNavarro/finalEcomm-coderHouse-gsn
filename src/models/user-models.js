'use strict';
import { Schema, model } from 'mongoose';
import argon2 from 'argon2';

import logger from '../config/logs/loggers.js';

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 12 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    cellphone: { type: String, required: true, trim: true },
    userImage: {
      profilePicUrl: { type: String },
      public_id: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hash = await argon2.hash(this.password);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (err) {
    logger.error(err.message);
  }
};

export default model('Users', UserSchema);
