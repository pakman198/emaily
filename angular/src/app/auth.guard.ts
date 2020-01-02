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

    if(state.url === '/') {
      // TODO check login to continue or redirect to dashboard
      console.log('URL', state.url)
    } else {
      console.log('URL NOT /', state.url)
    }

    return true

    // // return this.authService.validateLogin();
    // // return false;
    // setTimeout(()=> { console.log('isLoggedIn', this.authService.isLoggedIn) }, 3000)
    // return false;

    // this.authService.getCurrentUser().map(
    //   user => {
    //     if( !user ) return true;
        
    //     this.router.navigate(['/surveys']);
    //     return false;
  
    //   }
    // );
    
    
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Guard {
    console.log('CAN_ACTIVATE_CHILD')
    return this.canActivate(next, state);
  }
  
}
