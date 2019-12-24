import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../surveys.service';
import { Subscription } from 'rxjs';

import { Survey } from '../surveys.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  subscription: Subscription;
  surveys: Survey[];

  constructor(private surveysService: SurveysService) { }

  ngOnInit() {
    this.subscription = this.surveysService.fetchSurveys()
      .subscribe(surveys => {
        console.log({ surveys })
        surveys.forEach(survey => {
          survey.dateSent = new Date(survey.dateSent).toLocaleDateString();
          
          return survey;
        });
        
        this.surveys = surveys;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
;  }

}
