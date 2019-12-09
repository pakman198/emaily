const mongoose = require('mongoose');
 
const authentication = require('../middlewares/authentication');
const validateCredits = require('../middlewares/validateCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/survey');

const Survey = mongoose.model('Survey')

module.exports = app => {
  app.post('/api/surveys', authentication, validateCredits, (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(',').map(recipient => ({ email: recipient.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

  });
}