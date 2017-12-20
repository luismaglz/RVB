import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IAppState } from '../../models/all-models';

import * as  SessionActions from '../../store/actions/session.actions';


@Component({
  selector: 'app-session-header',
  templateUrl: './session-header.component.html',
  styleUrls: ['./session-header.component.scss']
})
export class SessionHeaderComponent implements OnInit, OnDestroy {
  subscriptions = new Array<Subscription>();

  totalClimbs = 0;
  totalAttempts = 0;

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(state => state.session.session).subscribe(session => {
        this.totalClimbs = 0;
        this.totalAttempts = 0;
        for (const routeId in session) {
          if (session.hasOwnProperty(routeId)) {
            const route = session[routeId];
            this.totalClimbs += route.completed;
            this.totalAttempts += route.attempts;
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe);
  }

  completeSession() {
    this.store.dispatch(new SessionActions.CompleteSession());
    this.router.navigate(['home'], { skipLocationChange: true });
  }

  constructor(private store: Store<IAppState>, private route: ActivatedRoute, private router: Router) { }
}
