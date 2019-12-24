import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private headerSubscription: Subscription;
  isLoggedIn: boolean = false;
  authUser: User | boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.headerSubscription = this.userService.authUser.subscribe(user => {
      console.log('HEADER', { user })
      this.isLoggedIn = !user ? false : true;
      if(user) this.authUser = user;
    })
  }

  ngOnDestroy() {
    this.headerSubscription.unsubscribe();
  }
}
