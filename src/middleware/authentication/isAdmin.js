import { AppErrors } from '../../utils/errors/error-app.js';

const admin = true;

export const areYouAnAdmin = (_req, _res, next) => {
  if (admin) {
    next();
  } else {
    const err = new AppErrors('You are not authorized to access these routes', 401);
    next(err);
  }
};
