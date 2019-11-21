require('dotenv').config({ path: '.env' });
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

passport.use( new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log({ accessToken, refreshToken, profile });
}));