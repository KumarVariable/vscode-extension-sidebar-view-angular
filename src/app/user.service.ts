/**
 * User Service class to get users.
 *
 * Mark the class with @Injectable to participate in dependency injecton.
 */

import { Injectable } from '@angular/core';
import { USERS } from './mock-users-data';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
    console.log('User Service called');
  }

  getUsers(): User[] {
    //return mock/dummy users from mock-users-data.ts
    return USERS;
  }
}
