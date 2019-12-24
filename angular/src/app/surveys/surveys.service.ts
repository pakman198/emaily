import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Survey } from './surveys.model';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http:HttpClient) { }

  fetchSurveys(): Observable<Survey[]> {
    console.log('FETCH_SURVEYS');

    return this.http.get<Survey[]>('/api/surveys').pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
