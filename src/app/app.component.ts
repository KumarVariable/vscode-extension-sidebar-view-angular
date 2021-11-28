import { Component } from '@angular/core';

/**
 * Application (root) component - <app-root> declared inside src/app/index.html
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Users';
}
