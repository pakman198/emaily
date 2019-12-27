import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Survey } from './surveys.model';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http:HttpClient, private router: Router, private userService: UserService) { }

  fetchSurveys(): Observable<Survey[]> {
    console.log('FETCH_SURVEYS');

    return this.http.get<Survey[]>('/api/surveys').pipe(
      catchError(this.errorHandler)
    )
  }

  submitSurvey(values) {
    console.log({ values })
    this.http.post('/api/surveys', values).pipe(
      catchError(this.errorHandler)
    ).subscribe(response => {

      // call the currentUser to update the userService.authUser 
      // and update the # of credits on the header
      this.userService.currentUser();
      this.router.navigate(['/surveys'])
    });
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
