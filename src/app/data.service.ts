import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { SessionRouteDataDictionary, AddSessionRequest, IAppState, IProfile } from '../app/models/all-models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as userInfoReducer from './store/reducers/user-info.reducer';

@Injectable()
export class DataService {

  result: any;
  token: string;
  constructor(private _http: Http, private store: Store<IAppState>) {
    this.store.select(state => state.userInfo.token).subscribe(token => {
      this.token = token;
    });
  }

  getRoutes() {
    return this._http.get('/api/routes')
      .map(result => this.result = result.json().data);
  }

  createRoutes() {
    return this._http.post('/api/routes', {})
      .map(result => this.result = result.json().data);
  }

  completeSession(sessionData: SessionRouteDataDictionary) {
      const request = new AddSessionRequest();
      request.routes = sessionData;
      request.token = this.token;

      return this._http.post('/api/session', request)
        .map(result => this.result = result.json().data);
  }

  validateGoogleToken(token: string) {
    return this._http.post('/api/google-token/validate', { token: token })
      .map(result => this.result = result.json().data);
  }
}