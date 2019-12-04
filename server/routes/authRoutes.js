const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect dashboard.
      res.redirect('/surveys');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    // Passport exposes a logout() function on req (also aliased as logOut()) that can be 
    // called from any route handler which needs to terminate a login session. 
    // Invoking logout() will remove the req.user property and clear the login session (if any).
    req.logout();
    res.redirect('/');
  });
}