import { Component, OnInit } from '@angular/core';
import { AppMessageService } from '../app-message.service';

@Component({
  selector: 'app-app-messages',
  templateUrl: './app-messages.component.html',
  styleUrls: ['./app-messages.component.css'],
})
export class AppMessagesComponent implements OnInit {
  constructor(public messageService: AppMessageService) {
    console.log('Inject Message Service while creating Message Component');
  }

  ngOnInit(): void {}
}
