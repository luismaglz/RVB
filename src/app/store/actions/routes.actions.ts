import { Action } from '@ngrx/store';
import { IRouteData } from '../../models/all-models';

export const GET_ROUTES = '[ROUTES] GET_ROUTES';
export const GET_ROUTES_SUCCESS = '[ROUTES] GET_ROUTES_SUCCES';
export const GET_ROUTES_FAIL = '[ROUTES] GET_ROUTES_FAIL';

export class GetRoutes implements Action {
    readonly type = GET_ROUTES;
    constructor(public payload: string) { }
}

export class GetRoutesSuccess implements Action {
    readonly type = GET_ROUTES_SUCCESS;
    constructor(public payload: Array<IRouteData>) { }
}

export class GetRoutesFail implements Action {
    readonly type = GET_ROUTES_FAIL;
    constructor(public payload: any) { }
}

export type Actions =
    GetRoutes
    | GetRoutesSuccess
    | GetRoutesFail;
