import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData, IAppState } from '../../models/all-models';
import * as  SessionActions from '../../store/actions/session.actions';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {
  routeData: Array<IRouteData>;
  currentSessionData: SessionRouteDataDictionary;
  subscriptions = new Array<Subscription>();
  filters: { [type: number]: Array<string> };
  routeTypes: Array<string>;

  ngOnInit() {
    this.getRoutes();
    this.store.dispatch(new SessionActions.StartSession());
    this.subscriptions.push(
      this.store.select(state => state.session.session).subscribe(session => {
        this.currentSessionData = session;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe);
  }

  addAttempt(routeId: string, type: number): void {
    this.store.dispatch(new SessionActions.AddAttempt({ routeId: routeId, type: type }));
  }

  removeAttempt(routeId: string): void {
    this.store.dispatch(new SessionActions.RemoveAttempt(routeId));
  }

  addComplete(routeId: string, type: number): void {
    this.store.dispatch(new SessionActions.AddSend({ routeId: routeId, type: type }));

  }

  removeComplete(routeId: string): void {
    this.store.dispatch(new SessionActions.RemoveSend(routeId));

  }

  getRoutes() {
    this._dataService.getRoutes().filter(rwf => !!rwf).subscribe(routesWithFilters => {
      if (routesWithFilters[0]) {
        if (routesWithFilters[0].routes) {
          this.routeData = [...routesWithFilters[0].routes];
        }
        // if (routesWithFilters[0].filters) {
        //   this.filters = this.routeData = routesWithFilters[0].filters;
        //   this.routeTypes = new Array<string>();
        //   for (const routeType in this.filters) {
        //     if (this.filters.hasOwnProperty(routeType)) {
        //       this.routeTypes.push(routeType);
        //     }
        //   }
        // }
      }
    });
  }

  constructor(private _dataService: DataService,
    private store: Store<IAppState>) { }
}
