import { Injectable } from '@angular/core';

/**
 * Message Service for sending messages to be displayed in applicaton.
 * This services has cache of messages and two methods :-
 * add() -> a message to the cache
 * clear() -> clear messages from cache.
 */
@Injectable({
  providedIn: 'root',
})
export class AppMessageService {
  messages: string[] = [];

  constructor() {
    console.log('Load Message Service');
  }

  addMessage(message: string) {
    this.messages.push(message);
  }

  clearMessages() {
    this.messages = [];
  }
}
