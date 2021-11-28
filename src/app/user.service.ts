/**
 * User Service class to get users.
 *
 * Mark the class with @Injectable to participate in dependency injecton.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppMessageService } from './app-message.service';
import { USERS } from './mock-users-data';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // A typical "service-in-service" scenario -
  // Inject MessageService into the HeroService
  constructor(private messageService: AppMessageService) {
    console.log('Inject Message Service into User Service');
  }

  /**
   * Observable - A representation of any set of values over any amount of time.
   * This is the most basic building block of RxJS.
   *
   * To get data from server(Http call) - use RxJs of() function.
   *
   * @returns users
   */
  getUsers(): Observable<User[]> {
    const users = of(USERS);
    this.messageService.addMessage('UserService: fetched all users');
    return users;
  }
}
