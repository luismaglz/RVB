import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, MatChipsModule, MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { RouteTrackerComponent } from './components/route-tracker/route-tracker.component';
import { GoogleLoginComponent } from './components/login/google-login/google-login.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { SessionComponent } from './components/session/session.component';
import { RateComponent } from './components/rate/rate.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'session', component: SessionComponent },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatChipsModule,
    MatTabsModule,
    MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [
    AppComponent,
    RouteTrackerComponent,
    GoogleLoginComponent,
    CurrentUserComponent,
    SessionComponent,
    RateComponent,
    HomeComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
