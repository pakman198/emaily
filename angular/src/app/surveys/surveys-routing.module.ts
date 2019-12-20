import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveysComponent } from './surveys.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [{ 
  path: 'surveys', 
  component: SurveysComponent, 
  /*canActivate: [AuthGuard]*/
  children: [
    { path: '', component: SurveyListComponent }
  ]
}]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SurveysRoutingModule {}