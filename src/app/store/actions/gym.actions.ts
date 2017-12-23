import { Action } from '@ngrx/store';
import { IBaseGym } from '../../models/all-models';

export const GET_GYMS = '[GYM] GET_GYMS';
export const GET_GYMS_SUCCESS = '[GYM] GET_GYMS_SUCCESS';
export const GET_GYMS_FAIL = '[GYM] GET_GYMS_FAIL';
export const GET_GYM_DETAILS = '[GYM] GET_GYM_DETAILS';
export const GET_GYM_DETAILS_SUCCESS = '[GYM] GET_GYM_DETAILS_SUCCESS';
export const GET_GYM_DETAILS_FAIL = '[GYM] GET_GYM_DETAILS_FAIL';

export class GetGyms implements Action {
    readonly type = GET_GYMS;
}

export class GetGymsSuccess implements Action {
    readonly type = GET_GYMS_SUCCESS;
    constructor(public payload: Array<IBaseGym>) { }
}

export class GetGymsFail implements Action {
    readonly type = GET_GYMS_FAIL;
    constructor(public payload: any) { }
}

export class GetGymDetails implements Action {
    readonly type = GET_GYM_DETAILS;
    constructor(public payload: string) { }
}

export class GetGymDetailsSuccess implements Action {
    readonly type = GET_GYM_DETAILS_SUCCESS;
    constructor(public payload: Array<IBaseGym>) { }
}

export class GetGymDetailsFail implements Action {
    readonly type = GET_GYM_DETAILS_FAIL;
    constructor(public payload: any) { }
}

export type Actions =
    GetGyms
    | GetGymsSuccess
    | GetGymsFail
    | GetGymDetails
    | GetGymDetailsSuccess
    | GetGymDetailsFail;
