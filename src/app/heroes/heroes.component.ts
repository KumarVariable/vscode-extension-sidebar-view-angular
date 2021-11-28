import { Component, OnInit } from '@angular/core';

/**
 * selector — the component's CSS element selector. Matches the name of HTML element <app-heroes>.
 * templateUrl — the location of the component's template file.
 * styleUrls — the location of the component's private CSS styles.
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor() {
    console.log('Load Hero Component');
  }

  /**
   * Lifecycle hook.Place to initlialization logic
   * Angular calls ngOnInit() shortly after creating a component).
   */
  ngOnInit(): void {}

  heroes = 'Windstorm';
}
