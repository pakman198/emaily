import { Injectable } from '@angular/core';
import { 
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

type Guard = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Guard {
    console.log('CAN_ACTIVATE')
    console.log('isLoggedIn', this.authService.isLoggedIn, {next, state});

    return this.authService.getCurrentUser().pipe(
      map(currentUser => {
        console.log({ currentUser })
        if(state.url === '/' && this.authService.isLoggedIn) {
          this.router.navigate(['/surveys']);
          return false
          
        } else if(state.url === '/' && !this.authService.isLoggedIn) {
          console.log('URL NOT /', state.url)
    
          return true;
        } else if(this.authService.isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Guard {
    console.log('CAN_ACTIVATE_CHILD')
    return this.canActivate(next, state);
  }
  
}
