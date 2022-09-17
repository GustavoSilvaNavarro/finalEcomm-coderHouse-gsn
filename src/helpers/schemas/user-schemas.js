'use strict';
import { object, string } from 'zod';

export const authUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    lastName: string({
      required_error: 'Last name is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, { message: 'Password must be 6 or more characters long' })
      .trim(),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }).min(6, { message: 'Password confirmation must be 6 or more characters long' }),
    email: string({
      required_error: 'Email is required',
    })
      .email({ message: 'Email must be a valid email' })
      .trim(),
    age: string({
      required_error: 'Age is required',
    })
      .min(1, { message: 'Age must be at least 1 or more characters long' })
      .refine(val => !isNaN(Number(val)), {
        message: 'Age must be a number',
      })
      .refine(val => Number.isInteger(Number(val)), {
        message: 'Age must be an integer',
      })
      .refine(val => Number(val) >= 12, {
        message: 'Age must be greater than 12 years',
      }),
    address: string({
      required_error: 'Address is required',
    })
      .min(1, { message: 'Must be at least 1 or more characters long' })
      .trim(),
    cellphone: string({
      required_error: 'Cellphone is required',
    })
      .startsWith('+', { message: 'Need to insert full phone number starting with + following international code' })
      .min(6, { message: 'Must be at least 6 or more digits' })
      .trim(),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export const loginUserSchema = object({
  body: object({
    emailUser: string({
      required_error: 'Email is required',
    })
      .email({ message: 'Email must be a valid email' })
      .trim(),
    passwordUser: string({
      required_error: 'Password is required',
    })
      .min(6, { message: 'Password must be 6 or more characters long' })
      .trim(),
  }),
});
