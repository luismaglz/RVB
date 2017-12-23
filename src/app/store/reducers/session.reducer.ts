import * as SessionActions from '../actions/session.actions';
import update from 'immutability-helper';

import { ISessionState, SessionRouteDataDictionary, SessionRouteData } from '../../models/all-models';

/// Default app state
const defaultState: ISessionState = {
    session: new SessionRouteDataDictionary(),
    loading: false
};

/// Reducer function
export function sessionReducer(state: ISessionState = defaultState, action: SessionActions.Actions) {
    switch (action.type) {
        case SessionActions.START_SESSION:
            return {
                ...state,
                session: new SessionRouteDataDictionary()
            };
        case SessionActions.ADD_ATTEMPT:
            if (state.session[action.payload.routeId]) {
                return update(state, {
                    session: {
                        [action.payload.routeId]: {
                            attempts: {
                                $apply: attempts => attempts + 1
                            }
                        }
                    }
                });
            } else {
                const session = new SessionRouteData(action.payload.routeId, action.payload.type);
                session.addAttempt();
                return update(state, {
                    session: {
                        [action.payload.routeId]: {
                            $set: session
                        }
                    }
                });
            }
        case SessionActions.REMOVE_ATTEMPT:
            if (state.session[action.payload]) {
                return update(state, {
                    session: {
                        [action.payload]: {
                            attempts: {
                                $apply: attempts => {
                                    return (attempts > 0 ? attempts - 1 : 0);
                                }
                            }
                        }
                    }
                });
            }
            return state;
        case SessionActions.ADD_SEND:
            if (state.session[action.payload.routeId]) {
                return update(state, {
                    session: {
                        [action.payload.routeId]: {
                            completed: { $apply: completed => completed + 1 }
                        }
                    }
                });
            } else {
                const session = new SessionRouteData(action.payload.routeId, action.payload.type);
                session.addCompleted();
                return update(state, {
                    session: {
                        [action.payload.routeId]: {
                            $set: session
                        }
                    }
                });
            }
        case SessionActions.REMOVE_SEND:
            if (state.session[action.payload]) {
                return update(state, {
                    session: {
                        [action.payload]: {
                            completed: {
                                $apply: completed => {
                                    return (completed > 0 ? completed - 1 : 0);
                                }
                            }
                        }
                    }
                });
            }
            return state;
        default:
            return state;
    }
}
