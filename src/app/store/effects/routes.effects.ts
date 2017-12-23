import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { DataService } from '../../data.service';

import * as RoutesActions from '../actions/routes.actions';
import { IRouteData } from '../../models/all-models';

@Injectable()
export class RoutesEffects {

    @Effect() getRoutes$: Observable<Action> = this.actions$
        .ofType<RoutesActions.GetRoutes>(RoutesActions.GET_ROUTES)
        .switchMap(action => this._dataService.getRoutes(action.payload)
            .map(data => ({ type: RoutesActions.GET_ROUTES_SUCCESS, payload: data }))
            .catch(() => of({ type: RoutesActions.GET_ROUTES_FAIL }))
        );

    constructor(
        private actions$: Actions,
        private _dataService: DataService
    ) { }
}