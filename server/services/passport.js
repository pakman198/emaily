require('dotenv').config({ path: '.env' });
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// this function generates a cookie
passport.serializeUser((user, done) => done(null, user.id));

// get the cookie and query the db with the ObjectID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  }, 
  async (accessToken, refreshToken, profile, done) => {
    console.log({ accessToken, refreshToken, profile });

    const existingUser = await User.findOne({ facebookId: profile.id })
    if(existingUser) {
      return done(null, existingUser);
    } 
    
    const newUser = await User.create({ facebookId: profile.id })
    done(null, result);
    
  }
));