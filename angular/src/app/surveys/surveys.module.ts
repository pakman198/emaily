import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveysComponent } from './surveys.component';
import { SurveysRoutingModule } from './surveys-routing.module';



@NgModule({
  declarations: [SurveyListComponent, SurveysComponent],
  imports: [
    CommonModule,
    RouterModule,
    SurveysRoutingModule
  ]
})
export class SurveysModule { }
