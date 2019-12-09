const authentication = require('../middlewares/authentication');
const validateCredits = require('../middlewares/validateCredits');

module.exports = app => {
  app.post('/api/surveys', authentication, validateCredits, (req, res) => {

  });
}