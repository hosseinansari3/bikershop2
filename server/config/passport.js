const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/userModel");
const secret = process.env.jwt_sec;

const setupPassport = () => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // end the current login session after deserialising the user
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => console.log(`${err}`.bgRed.bold));
  });

  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then((user) => {
          if (user) {
            console.log("bala");
            return done(null, user);
          }
          console.log("paeen");
          return done(null, false);
        })
        .catch((err) => {
          console.log("paeentar");
          return done(err, false);
        });
    })
  );
};

module.exports = { setupPassport };
