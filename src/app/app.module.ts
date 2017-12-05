import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule } from '@angular/material';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { RouteTrackerComponent } from './components/route-tracker/route-tracker.component';
import { GoogleLoginComponent } from './components/login/google-login/google-login.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';


@NgModule({
  declarations: [
    AppComponent,
    RouteTrackerComponent,
    GoogleLoginComponent,
    CurrentUserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
