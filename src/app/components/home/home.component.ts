import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../../data.service';
import { DatePipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ISessionInfo, ISessionInfoClimbedTotals, IAppState } from '../../models/all-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sessions: Observable<any>;

  getSessions() {
    this.store.select(store => store.userInfo.token)
      .filter(t => !!t)
      .subscribe(token => {
        this.sessions = this._dataService.getSessions(token);
      });
  }

  ngOnInit() {
    this.getSessions();
  }

  constructor(private _dataService: DataService, private store: Store<IAppState>) { }
}
