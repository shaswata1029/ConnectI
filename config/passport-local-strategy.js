const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// authentication using passport and find a user and establish an identity
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in findind user-->Passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("Invalid username/password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in findind user-->Passport");
      return done(err);
    }

    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/users/sign_in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
