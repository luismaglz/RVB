import { Action } from '@ngrx/store';

export const START_SESSION = '[SESSION] START';
export const COMPLETE_SESSION = '[SESSION] COMPLETE';
export const COMPLETE_SESSION_SUCCESS = '[SESSION] COMPLETE SUCCESS';
export const COMPLETE_SESSION_FAIL = '[SESSION] COMPLETE FAIL';
export const ADD_ATTEMPT = '[SESSION] ADD ATTEMPT';
export const REMOVE_ATTEMPT = '[SESSION] REMOVE ATTEMPT';
export const ADD_SEND = '[SESSION] ADD SEND';
export const REMOVE_SEND = '[SESSION] REMOVE SEND';

export class StartSession implements Action {
    readonly type = START_SESSION;
}

export class CompleteSession implements Action {
    readonly type = COMPLETE_SESSION;
}

export class CompleteSessionSuccess implements Action {
    readonly type = COMPLETE_SESSION_SUCCESS;
    constructor(public payload: any) { }
}

export class CompleteSessionFail implements Action {
    readonly type = COMPLETE_SESSION_FAIL;
    constructor(public payload: any) { }

}

export class AddAttempt implements Action {
    readonly type = ADD_ATTEMPT;
    constructor(public payload: { routeId: string, type: number }) { }
}

export class AddSend implements Action {
    readonly type = ADD_SEND;
    constructor(public payload: { routeId: string, type: number }) { }
}

export class RemoveAttempt implements Action {
    readonly type = REMOVE_ATTEMPT;
    constructor(public payload: string) { }
}

export class RemoveSend implements Action {
    readonly type = REMOVE_SEND;
    constructor(public payload: string) { }
}


export type Actions =
    StartSession
    | CompleteSession
    | CompleteSessionSuccess
    | CompleteSessionFail
    | AddAttempt
    | AddSend
    | RemoveSend
    | RemoveAttempt;
