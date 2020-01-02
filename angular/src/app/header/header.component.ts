import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from '../user.model';
import { AuthService } from '../auth.service';

declare var M: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private headerSubscription: Subscription;
  isLoggedIn: boolean = false;
  authUser: User | boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.headerSubscription = this.authService.authUser.subscribe(user => {
      console.log('HEADER', { user })
      this.isLoggedIn = !user ? false : true;
      if(user) this.authUser = user;
    });

    M.AutoInit();
  }

  ngOnDestroy() {
    this.headerSubscription.unsubscribe();
  }
  
}
