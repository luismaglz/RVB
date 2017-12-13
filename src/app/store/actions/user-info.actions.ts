import { Action } from '@ngrx/store';

import { IProfile } from '../../models/all-models';

export const SET_PROFILE = '[PROFILE] SET PROFILE';
export const SET_TOKEN = '[PROFILE] SET TOKEN';

export class SetProfile implements Action {
    readonly type = SET_PROFILE;
    constructor(public payload: IProfile) { }
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) { }
}

export type Actions
    = SetProfile
    | SetToken;
