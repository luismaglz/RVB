import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  token = null;
  profile = null;
  routeData = null;

  ngOnInit(){
    this.getRoutes();
  }

  logInSuccess(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  onToken(token: string) {
    this.token = token;
  }

  onProfile(profile: any) {
    this.profile = profile;
  }

  createRoutes() {
    this._dataService.createRoutes().subscribe(data => {
      debugger;
    });
  }

  getRoutes() {
    this._dataService.getRoutes().subscribe(data => {
      if (!data) { return null; }
      this.routeData = data;
    });
  }

  constructor(private _dataService: DataService) { }
}
