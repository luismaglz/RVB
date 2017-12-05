import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {
  profile = null;


  constructor(ngZone: NgZone, private _dataService:DataService) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }

  ngOnInit() {
    if (window['auth2'] && window['auth2'].isSignedIn && window['auth2'].isSignedIn.get()) {
      this.profile = window['auth2'].currentUser.get().getBasicProfile();
    }
  }
  
  onSignIn(googleUser) {
    this.profile = googleUser.getBasicProfile();
    var token = googleUser.getAuthResponse().id_token;
    this._dataService.validateGoogleToken(token).subscribe(data => {
      debugger;
    })
  }

  
  signOut() {
    var auth2 = window["gapi"].auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}
