import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GoogleTokenUtilities } from '../../helpers/google-token.helper';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IAppState, IProfile } from '../../models/all-models';
import * as userInfoReducer from '../../store/reducers/user-info.reducer';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit, OnDestroy {

  profile: IProfile = null;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.userInfo.profile).subscribe(profile => {
        this.profile = profile;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  constructor(private store: Store<IAppState>) { }
}
