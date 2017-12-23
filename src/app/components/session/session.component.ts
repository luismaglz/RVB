import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData, IAppState, IGym } from '../../models/all-models';
import * as  SessionActions from '../../store/actions/session.actions';
import * as  RoutesActions from '../../store/actions/routes.actions';
import * as  GymActions from '../../store/actions/gym.actions';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  routeData: Observable<Array<IRouteData>>;
  gymData: Observable<IGym>;
  gymAreas: Observable<Array<string>>;
  gymClimbTypes: Observable<Array<string>>;
  currentSessionData: SessionRouteDataDictionary = {};

  ngOnInit() {
    this.gymData = this.store.select(store => store.gyms.selectedGym);
    this.gymAreas = this.store.select(store => {
      if (store.gyms && store.gyms.selectedGym && store.gyms.selectedGym.areas) {
        return store.gyms.selectedGym.areas;
      }
      return [];
    });
    this.gymClimbTypes = this.store.select(store => {
      if (store.gyms && store.gyms.selectedGym && store.gyms.selectedGym.grades) {
        const climbTypes = new Array<string>();
        for (const gradeName in store.gyms.selectedGym.grades) {
          if (store.gyms.selectedGym.grades.hasOwnProperty(gradeName)) {
            climbTypes.push(gradeName);
          }
        }
        return climbTypes;
      }
      return [];
    });
    this.routeData = this.store.select(store => store.routes.routes);
  }

  getRoutesByType(routeType: number) {
    return this.store.select(store => {
      if (store && store.routes && store.routes.routes) {
        return store.routes.routes.filter(r => r.type === routeType);
      }
      return [];
    });
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

  constructor(private _dataService: DataService,
    private store: Store<IAppState>) { }
}
