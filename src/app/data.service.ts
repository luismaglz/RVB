import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import {
  SessionRouteDataDictionary, BaseRequest,
  AddSessionRequest, UserInfoRequest, IAppState, IProfile
} from '../app/models/all-models';
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
  // Routes 
  getRoutes() {
    return this._http.get('/api/routes')
      .map(result => this.result = result.json().data);
  }

  createRoutes() {
    return this._http.post('/api/routes', {})
      .map(result => this.result = result.json().data);
  }

  // Sessions
  completeSession(sessionData: SessionRouteDataDictionary) {
    const request = new AddSessionRequest();
    request.routes = sessionData;
    request.token = this.token;

    return this._http.post('/api/session', request)
      .map(result => {
        this.result = result.json().data;
      });
  }

  getSessions(token: string) {
    const requestOptions = new RequestOptions();
    requestOptions.headers = new Headers({ userToken: token });
    return this._http.get('/api/session', requestOptions)
      .map(result => this.result = result.json().data);
  }

  // Users
  updateUserInformation(token: string, name: string, imageUrl: string) {
    const userRequest = new UserInfoRequest(token, name, imageUrl);
    return this._http.post('/api/user', userRequest)
      .map(result => this.result = result.json().data);
  }


  validateGoogleToken(token: string) {
    return this._http.post('/api/google-token/validate', { token: token })
      .map(result => this.result = result.json().data);
  }
}
