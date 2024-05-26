require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const keys = require("./keys");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { getAccessTokenOpts } = require("./token-options");

passport.serializeUser((user, done) => {
  console.log({ serializeUser: user });
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log({ deserializeUser: id });

  User.findById(id).then((user) => {
    done(null, user);
  });
});

function generateAccessToken(user) {
  const accessTokenOpts = getAccessTokenOpts();
  return jwt.sign({ user }, accessTokenOpts.secret, accessTokenOpts.tokenOpts);
}

passport.use(
  new GitHubStrategy(
    {
      callbackURL: "/auth/github/redirect",
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("user is:", currentUser);
          done(null, {
            accessToken: generateAccessToken({
              id: currentUser.id,
              username: currentUser.username,
            }),
            user: currentUser,
          });
        } else {
          new User({
            username: profile.username,
            githubId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new user created:" + newUser);
              done(null, {
                accessToken: generateAccessToken({
                  id: newUser.id,
                  username: newUser.username,
                }),
                user: newUser,
              });
            });
        }
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("user is:", currentUser);
          done(null, {
            accessToken: generateAccessToken({
              id: currentUser.id,
              username: currentUser.username,
            }),
            user: currentUser,
          });
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log("new user created:" + newUser);
              done(null, {
                accessToken: generateAccessToken({
                  id: newUser.id,
                  username: newUser.username,
                }),
                user: newUser,
              });
            });
        }
      });
    }
  )
);
