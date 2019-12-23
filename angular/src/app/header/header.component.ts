import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth: boolean | null = false;
  user;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
}
