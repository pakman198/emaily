import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  authUser: BehaviorSubject<null|boolean|User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) { }

  currentUser() {
    console.log('CURRENT_USER');
    this.http.get(`/api/current_user`).pipe(
      catchError(this.errorHandler)
    ).subscribe((user:User) => {
      console.log({user})
      if(user) this.isLoggedIn = true;
      
      this.authUser.next(user)
    });
  }

  getCurrentUser() {
    return  this.http.get(`/api/current_user`).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
