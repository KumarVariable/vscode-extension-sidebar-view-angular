import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {

  // selected user(an input property) on click event
  @Input() user?: User;

  constructor() {
    console.log('load user details component');
  }

  ngOnInit(): void {}
}
