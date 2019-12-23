import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = null;
  constructor(private http: HttpClient) { }

  facebookLogin() {
    return this.http.get(`/auth/facebook`).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
