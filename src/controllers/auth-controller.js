//! POST - Register new user
export const createNewUser = (_req, res, next) => {
  try {
    res.status(200).redirect('/');
  } catch (err) {
    next(err);
  }
};

//! POST - Login and authenticate the user
export const loginUser = (_req, res, next) => {
  try {
    res.status(200).redirect('/');
  } catch (err) {
    next(err);
  }
};
