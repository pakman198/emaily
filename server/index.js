
require('dotenv').config({ path: '.env' });
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const app = express();

passport.use( new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  console.log({ accessToken, refreshToken, profile });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log({ req });
    res.redirect('/');
});

app.get('/', (req, res) => {
  res.send({ hi: 'there'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 App running on port ${PORT}`);
});