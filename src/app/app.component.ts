import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  token = null;
  profile = null;

  constructor() { }

  logInSuccess(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  onToken(token: string) {
    this.token = token;
  }

  onProfile(profile: any) {
    this.profile = profile;
  }
}
