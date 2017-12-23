import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTableModule, MatToolbarModule, MatChipsModule, MatTabsModule, MatCardModule, MatExpansionModule, MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

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
import { MainLoginComponent } from './components/login/main-login/main-login.component';

// Rxjs
import '../app/helpers/rxjs-operators';

// Redux
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Reducers
import { userInfoReducer, sessionReducer, gymsReducer, routesReducer } from './store/reducers';

// Effects
import { SessionEffects } from './store/effects/session.effects';
import { RoutesEffects } from './store/effects/routes.effects';
import { GymEffects } from './store/effects/gym.effects';
import { rootRenderNodes } from '@angular/core/src/view/util';
import { GymSelectComponent } from './components/gym-select/gym-select.component';

const appRoutes: Routes = [
  { path: '', component: MainLoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'session', component: SessionComponent },
  { path: 'gym-select', component: GymSelectComponent },
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
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    EffectsModule.forRoot([
      SessionEffects,
      RoutesEffects,
      GymEffects
    ]),
    StoreModule.forRoot({
      userInfo: userInfoReducer,
      session: sessionReducer,
      gyms: gymsReducer,
      routes: routesReducer
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
    MainLoginComponent,
    GymSelectComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
