// @ts-ignore
import { BasicStrategy } from 'passport-http';
import { PassportStatic } from 'passport';

export default (
  USERS: { [index: string]: string },
  passport: PassportStatic,
) => {
  passport.use(
    new BasicStrategy((username: string, password: string, done: Function) => {
      const userPassword = USERS[username];
      if (userPassword === password) {
        return done(null, { username: username, password: userPassword });
      }
      return done(null, false);
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
