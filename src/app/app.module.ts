import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, MatChipsModule, MatTabsModule, MatCardModule } from '@angular/material';
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
import { SessionHeaderComponent } from './components/session-header/session-header.component';

// Rxjs
import '../app/helpers/rxjs-operators';

// Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Reducers
import { userInfoReducer } from './store/reducers';
import { MainLoginComponent } from './components/login/main-login/main-login.component';

const appRoutes: Routes = [
  { path: '', component: MainLoginComponent },
  { path: 'home', component: HomeComponent },
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
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    StoreModule.forRoot({
      userInfo: userInfoReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  declarations: [
    AppComponent,
    RouteTrackerComponent,
    GoogleLoginComponent,
    CurrentUserComponent,
    SessionComponent,
    RateComponent,
    HomeComponent,
    SessionHeaderComponent,
    MainLoginComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
