import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { DataService } from '../../data.service';

import * as GymActions from '../actions/gym.actions';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData, IAppState } from '../../models/all-models';

@Injectable()
export class GymEffects {
    @Effect() getGymDetails$: Observable<Action> = this.actions$
        .ofType<GymActions.GetGymDetails>(GymActions.GET_GYM_DETAILS)
        .switchMap(action => this._dataService.getGymDetails(action.payload)
            .map(data => ({ type: GymActions.GET_GYM_DETAILS_SUCCESS, payload: data }))
            .catch(() => of({ type: GymActions.GET_GYM_DETAILS_FAIL }))
        );

    @Effect() getGyms$: Observable<Action> = this.actions$
        .ofType<GymActions.GetGyms>(GymActions.GET_GYMS)
        .switchMap(action => this._dataService.getGyms()
            .map(data => ({ type: GymActions.GET_GYMS_SUCCESS, payload: data }))
            .catch(() => of({ type: GymActions.GET_GYMS_FAIL }))
        );

    constructor(
        private actions$: Actions,
        private _dataService: DataService
    ) { }
}
