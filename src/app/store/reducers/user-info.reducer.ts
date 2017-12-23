import * as UserInfoActions from '../actions/user-info.actions';

import { IUserInfoState } from '../../models/all-models';

/// Default app state
const defaultState: IUserInfoState = {
    profile: null,
    token: null,
    loading: false
};

/// Helper function to create new state object
const newState = (state, newData) => {
    return Object.assign({}, state, newData);
}

/// Reducer function
export function userInfoReducer(state: IUserInfoState = defaultState, action: UserInfoActions.Actions) {
    switch (action.type) {
        case UserInfoActions.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case UserInfoActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
