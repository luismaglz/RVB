import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { IProfile, IAppState } from './models/all-models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GoogleTokenUtilities } from './helpers/google-token.helper';
import * as UserInfoActions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() { }

  onGapiLoad() {
    GoogleTokenUtilities.appStart(this.onGoogleUser.bind(this));
  }

  onGoogleUser(googleUser) {
    if (googleUser) {
      const profile = googleUser.getBasicProfile();
      const userToken = googleUser.getAuthResponse().id_token;

      const profileInfo = {
        name: profile.getName(),
        imageUrl: profile.getImageUrl()
      } as IProfile;
      this._dataService.updateUserInformation(userToken, profileInfo.name, profileInfo.imageUrl).subscribe(data => {
        this.store.dispatch(new UserInfoActions.SetProfile(profileInfo));
        this.store.dispatch(new UserInfoActions.SetToken(userToken));
      });
    }
  }

  constructor(ngZone: NgZone, private _dataService: DataService, private store: Store<IAppState>) {
    window['onGapiLoad'] = (user) => ngZone.run(() => this.onGapiLoad());
  }
}
