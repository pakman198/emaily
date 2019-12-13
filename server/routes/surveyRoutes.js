const mongoose = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');
const _ = require('lodash');
 
const authentication = require('../middlewares/authentication');
const validateCredits = require('../middlewares/validateCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/survey');

const Survey = mongoose.model('Survey')

module.exports = app => {
  app.get('/api/surveys', authentication, async (req, res) => {
    const { user } = req;

    try {
      const surveys = await Survey
        .find({ _user: user.id })
        .select({ recipients: false });

      res.send(surveys)
    }catch(err) {
      console.log({ err });
    }
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

  app.get('/api/surveys/:surveyID/:choice', (req,res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req,res) => {
    const p = new Path('/api/surveys/:surveyID/:choice');
    const events = _.chain(req.body)
      .map(event => {
        if(!event.hasOwnProperty('url')) return
        const match = p.test(new URL(event.url).pathname);

        if(match) {
          return {
            email: event.email,
            surveyID: match.surveyID,
            choice: match.choice
          }
        }
      })
      .compact()
      .uniqBy('email', 'surveyID')
      .each(event => {
        Survey.findOneAndUpdate({
          _id: event.surveyID,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        }, {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec()
      })
      .value();
    

    console.log({ events })

    res.send({});
  });
}