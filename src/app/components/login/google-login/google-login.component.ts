import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../data.service';
import { GoogleTokenUtilities } from '../../../helpers/google-token.helper';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})

export class GoogleLoginComponent {
  @Output() logInSuccess = new EventEmitter<boolean>();
  @Output() profile = new EventEmitter<any>();
  @Output() token = new EventEmitter<string>();

  onSignIn(googleUser) {
    const token = googleUser.getAuthResponse().id_token;
    const profile = googleUser.getBasicProfile();
    const userToken = googleUser.getAuthResponse().id_token;

    this.profile.emit(profile);
    this.token.emit(userToken);
    this.logInSuccess.emit(true);

    // this._dataService.validateGoogleToken(token).subscribe(data => {
    //   debugger;
    // });
  }

  constructor(ngZone: NgZone, private _dataService: DataService) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }

  // signOut() {
  //   let auth2 = window['gapi'].auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }
}
