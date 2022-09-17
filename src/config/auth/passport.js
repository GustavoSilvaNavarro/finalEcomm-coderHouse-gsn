'use strict';
import localPassport from 'passport-local';
import fs from 'fs-extra';

import UserModel from '../../models/user-models.js';
import { uploadImage } from '../../utils/upload-images/cloudinary.js';

const LocalStrategy = localPassport.Strategy;

export const passportSetupInitialize = passport => {
  //! Register Logic with Passport
  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, _, done) => {
        try {
          //* Check if a user has been registered with this email
          const userInDataBase = await UserModel.findOne({ email });

          if (userInDataBase) {
            return done(null, false, { message: 'User already registered' });
          }

          const newUser = new UserModel(req.body);

          if (req.file) {
            const result = await uploadImage(req.file.path, 'users');

            newUser.userImage = {
              profilePicUrl: result.secure_url,
              public_id: result.public_id,
            };

            await fs.unlink(req.file.path);
          }

          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //! Login Logic with Passport
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'emailUser',
        passwordField: 'passwordUser',
      },
      async (emailUser, passwordUser, done) => {
        try {
          const user = await UserModel.findOne({ email: emailUser });

          if (!user) {
            return done(null, false, { message: 'Invalid Credentials!' });
          } else {
            const passwordMatches = await user.comparePassword(passwordUser);

            if (passwordMatches) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Invalid Credentials!' });
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    return done(null, user);
  });
};
