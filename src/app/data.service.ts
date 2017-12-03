import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getRoutes() {
    return this._http.get("/api/routes")
      .map(result => this.result = result.json().data);
  }
  
  createRoutes(){
    return this._http.post("/api/routes", {})
      .map(result => this.result = result.json().data);
  }
  
  validateGoogleToken(token:string){
    return this._http.post("/api/google-token/validate", {token:token})
      .map(result => this.result = result.json().data);
  }
}