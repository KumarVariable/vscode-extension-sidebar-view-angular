import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    console.log('---------- app component loaded------------'); // Logs false for default environment
  }

  title = 'angular sidebar vscode';
}
