/**
 * Class provides navigation in application with routing.
 * Import  to have routing functionalty within application.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';

/**
 * routes tell the Router which view to display when user
 * clicks a link or pastes a URL into the browser address bar.
 * path - a string that matches the URL in the browser address bar.
 * component: the component that the router should create when navigating to this route.
 */
const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
