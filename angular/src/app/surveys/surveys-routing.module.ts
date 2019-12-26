import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveysComponent } from './surveys.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';

const routes: Routes = [{ 
  path: 'surveys', 
  component: SurveysComponent, 
  /*canActivate: [AuthGuard]*/
  children: [
    { path: '', component: SurveyListComponent },
    { path: 'new', component: SurveyFormComponent}
  ]
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SurveysRoutingModule {}