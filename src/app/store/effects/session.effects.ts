import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { DataService } from '../../data.service';
import { Store } from '@ngrx/store';
import * as SessionActions from '../actions/session.actions';
import { SessionRouteData, SessionRouteDataDictionary, IRouteData, IAppState } from '../../models/all-models';

@Injectable()
export class SessionEffects {
    @Effect() completeSession$: Observable<Action> = this.actions$.ofType(SessionActions.COMPLETE_SESSION)
        .withLatestFrom(this.store.select(state => state.session.session))
        .mergeMap(([action, sessions]) =>
            this._dataService.completeSession(sessions)
                .map(data => ({ type: SessionActions.COMPLETE_SESSION_SUCCESS, payload: data }))
                .catch(() => of({ type: SessionActions.COMPLETE_SESSION_FAIL }))
        );

    constructor(
        private store: Store<IAppState>,
        private actions$: Actions,
        private _dataService: DataService
    ) { }
}
