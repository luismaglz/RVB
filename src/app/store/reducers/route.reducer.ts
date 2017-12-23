import * as RoutesActions from '../actions/routes.actions';
import update from 'immutability-helper';

import { IRoutesState, IRouteData } from '../../models/all-models';

/// Default app state
const defaultState: IRoutesState = {
    routes: new Array<IRouteData>(),
    loading: false
};

/// Reducer function
export function routesReducer(state: IRoutesState = defaultState, action: RoutesActions.Actions) {
    switch (action.type) {

        case RoutesActions.GET_ROUTES_SUCCESS:
            return update(state, {
                routes: { $set: action.payload }
            });

        default:
            return state;
    }
}
