import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title', validation: { required: 'You must provide a title'}},
  { label: 'Subject Line', name: 'subject', validation: { required: 'You must provide a subject'}},
  { label: 'Email Body', name: 'body', validation: { required: 'You must provide a message body'}},
  { 
    label: 'Recipient List',
    name: 'recipients',
    validation: { 
      required: 'You must provide at least one recipient',
      validate: value => validateEmails(value),
    }
  },
];

export default FIELDS;