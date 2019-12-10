const mongoose = require('mongoose');
 
const authentication = require('../middlewares/authentication');
const validateCredits = require('../middlewares/validateCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/survey');

const Survey = mongoose.model('Survey')

module.exports = app => {

  app.get('/api/surveys/thanks', (req,res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys', authentication, validateCredits, async (req, res) => {
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

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(err) {
      console.log({ err });
      res.status(422).send(err)
    }


  });
}