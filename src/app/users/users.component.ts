import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users-data';
import { UserService } from '../user.service';

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
  users: User[] = [];

  // Inject User Service (Dependency Injection) into User component
  constructor(private userService: UserService) {
    console.log('load and inject user service into user component');
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  // get users from user service
  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  // called by angular component after constructing user component instance
  ngOnInit(): void {
    this.getUsers();
  }
}
