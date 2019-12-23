import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authUser: BehaviorSubject<null|boolean|User> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  currentUser() {
    console.log('CURRENT_USER');
    this.http.get(`/api/current_user`).pipe(
      catchError(this.errorHandler)
    ).subscribe((user:User) => {
      this.authUser.next(user)
    });;
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
