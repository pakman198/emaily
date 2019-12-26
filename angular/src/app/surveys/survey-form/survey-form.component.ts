import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { validateEmails } from '../validateEmails';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent {
  
  formFields = [
    { label: 'Survey Title', name: 'title', errorMsg: 'You must provide a title'},
    { label: 'Subject Line', name: 'subject', errorMsg: 'You must provide a subject'},
    { label: 'Email Body', name: 'body', errorMsg: 'You must provide a message body'},
    { label: 'Recipient List', name: 'recipients', errorMsg: 'You must provide at least one recipient'}
  ];

  surveyForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    body: new FormControl(null, Validators.required),
    recipients: new FormControl(null, [
      Validators.required,
      validateEmails()
    ])
  });

  constructor() { }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.surveyForm)
  }

}
