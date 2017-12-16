import { Component, OnInit, NgZone } from '@angular/core';
import { DataService } from './data.service';
import { IProfile, IAppState } from './models/all-models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { GoogleTokenUtilities } from './helpers/google-token.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() { }



  onGapiLoad() {
    GoogleTokenUtilities.appStart();
  }

  constructor(ngZone: NgZone, private _dataService: DataService, private store: Store<IAppState>) {
    window['onGapiLoad'] = (user) => ngZone.run(() => this.onGapiLoad());
  }
}
