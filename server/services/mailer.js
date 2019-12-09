const SendGrid = require('sendgrid');
const {
  Email,
  Content,
  Mail,
  TrackingSettings,
  ClickTracking,
  Personalization
} = SendGrid.mail;

class Mailer extends Mail {

  constructor({ subject, recipients }, content) {
    super();

    this.sgAPI = SendGrid(process.env.SENDGRID_API);
    this.from_email = new Email('no-reply@emaily.com', 'Emaily');
    this.subject = subject;
    this.body = new Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => new Email(email))
  }

  addClickTracking() {
    const trackingSettings = new TrackingSettings();
    const clickTracking = new ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new Personalization();
    this.recipients.forEach(recipient => personalize.addTo(recipient));

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgAPI.emptyRequest({ 
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgAPI.API(request);

    return response;
  }

}

module.exports = Mailer;