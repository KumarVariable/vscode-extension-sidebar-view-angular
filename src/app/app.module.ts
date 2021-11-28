/**
 * Every Angular applicaion has one root module called as NgModule.
 *
 * The application is launched by bootstrapping this root module a.k.a  AppModule
 *
 * declarations: components, directives, and pipes that belong to this NgModule.
 * exports: subset of declarations that should be visible and usable in the component
 * templates of other NgModules.
 *
 * providers: Creators of services that this NgModule contributes to the global collection
 * of services,will be accessible to all parts of application.
 *
 * bootstrap: The main application view, called the root component, which hosts all other application
 * views. Only the root NgModule should set the bootstrap property.
 *
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AppMessagesComponent } from './app-messages/app-messages.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    AppMessagesComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
