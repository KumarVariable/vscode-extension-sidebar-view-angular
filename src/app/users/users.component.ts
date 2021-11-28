import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users-data';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  
  // selected user(an input property) on click event
  selectedUser?: User;
  //define componet property - list of dummy users
  // from mock-users-data.ts
  users = USERS;

  constructor() {
     console.log('load user component');
  }

  onSelect(user: User) : void {
    this.selectedUser = user;
  }

  ngOnInit(): void {}
}
