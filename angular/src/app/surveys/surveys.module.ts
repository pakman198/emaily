import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveysComponent } from './surveys.component';
import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveyFormComponent } from './survey-form/survey-form.component';



@NgModule({
  declarations: [SurveyListComponent, SurveysComponent, SurveyFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    SurveysRoutingModule,
    ReactiveFormsModule
  ]
})
export class SurveysModule { }
