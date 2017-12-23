import * as GymActions from '../actions/gym.actions';
import update from 'immutability-helper';

import { ISessionState, IGym, IBaseGym, IGymState } from '../../models/all-models';

/// Default app state
const defaultState: IGymState = {
    gyms: new Array<IBaseGym>(),
    selectedGym: null,
    loading: true
};

/// Reducer function
export function gymsReducer(state: IGymState = defaultState, action: GymActions.Actions) {
    switch (action.type) {

        case GymActions.GET_GYM_DETAILS_SUCCESS:
            return update(state, {
                selectedGym: { $set: action.payload[0] }
            });
        case GymActions.GET_GYMS_SUCCESS:
            return update(state, {
                gyms: { $set: action.payload }
            });

        default:
            return state;
    }
}
