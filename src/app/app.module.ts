import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { RouteTrackerComponent } from './components/route-tracker/route-tracker.component';
import { RouteItemComponent } from './components/route-item/route-item.component';
import { GoogleLoginComponent } from './components/login/google-login/google-login.component';


@NgModule({
  declarations: [
    AppComponent,
    RouteTrackerComponent,
    RouteItemComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
