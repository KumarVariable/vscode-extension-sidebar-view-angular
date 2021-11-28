import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users-data';
import { UserService } from '../user.service';
import { AppMessageService } from '../app-message.service';

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
  constructor(
    private userService: UserService,
    private messageService: AppMessageService
  ) {
    console.log(
      'load and inject user service, message service into user component'
    );
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  // get users from user service by subscribing.
  getUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  // called by angular component after constructing user component instance
  ngOnInit(): void {
    this.getUsers();
  }
}
