import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../data.service';
import { GoogleTokenUtilities } from '../../../helpers/google-token.helper';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as UserInfoActions from '../../../store/actions';

import { IAppState, IProfile } from '../../../models/all-models';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})

export class GoogleLoginComponent {
  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    const userToken = googleUser.getAuthResponse().id_token;

    const profileInfo = {
      name: profile.getName(),
      imageUrl: profile.getImageUrl()
    } as IProfile;
    this._dataService.updateUserInformation(userToken, profileInfo.name, profileInfo.imageUrl).subscribe(data => {
      this.store.dispatch(new UserInfoActions.SetProfile(profileInfo));
      this.store.dispatch(new UserInfoActions.SetToken(userToken));
      this.router.navigate(['home']);
    });

  }


  constructor(
    ngZone: NgZone,
    private _dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
  }
}
