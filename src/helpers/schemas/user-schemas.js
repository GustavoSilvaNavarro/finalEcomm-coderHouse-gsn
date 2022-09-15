'use strict';
import { object, string, number } from 'zod';

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
    age: number({
      required_error: 'Age is required',
      invalid_type_error: 'Age must be a number',
    })
      .gte(12, { message: 'You must be older than 12 years' })
      .int({ message: 'Age must be an integer' }),
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
