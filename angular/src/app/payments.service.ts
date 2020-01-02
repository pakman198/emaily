import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  handleToken(token): Observable<any> {
    console.log('HANDLE_TOKEN');

    return this.http.post('/api/stripe', token).pipe(
      catchError(this.errorHandler),
      tap(res => this.authService.currentUser())
    );
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse);
  }
}
