import { NumberSymbol } from "@angular/common/src/i18n/locale_data_api";

// Interfaces
export interface IRouteData {
    id: string;
    zone: string;
    type: number;
    grade: string;
    color: String;
    likes: string;
    dislikes: string;
}

export interface IProfile {
    name: string;
    imageUrl: string;
}

export interface IUserInfoState {
    profile: IProfile;
    token: string;
    loading: boolean;
}

export interface IGymState {
    gyms: Array<IBaseGym>;
    selectedGym: IGym;
    loading: boolean;
}

export interface IRoutesState {
    routes: Array<IRouteData>;
    loading: boolean;
}

export interface IAppState {
    userInfo: IUserInfoState;
    session: ISessionState;
    gyms: IGymState;
    routes: IRoutesState;
}

export interface ISessionInfo {
    _id: string;
    name: string;
    imageUrl: string;
    date: string;
    description: string;
    climbed: ISessionInfoClimbedTotals;
}

export interface ISessionState {
    session: SessionRouteDataDictionary;
    loading: boolean;
}

export interface ISessionInfoClimbedTotals {
    lead: number;
    boulder: number;
    topRope: number;
    speed: number;
}

export interface IRouteResponse {
    gym: IGym;
    routes: Array<IRouteData>;
}
export interface IBaseGym {
    _id: string;
    name: string;
}

export interface IGym extends IBaseGym {
    areas: Array<string>;
    grades: {
        boulder: Array<string>;
        lead: Array<string>;
        top: Array<string>;
    };
}

// Classes
export class SessionRouteData {
    routeId: string;
    attempts: number;
    completed: number;
    comments: string;
    type: number;

    constructor(routeId: string, type: number) {
        this.routeId = routeId;
        this.attempts = 0;
        this.completed = 0;
        this.comments = null;
        this.type = type;
    }

    addAttempt() {
        this.attempts++;
    }

    removeAttempt() {
        if (this.attempts > 0) {
            this.attempts--;
        }
    }

    addCompleted() {
        this.completed++;
    }

    removeCompleted() {
        if (this.completed > 0) {
            this.completed--;
        }
    }

    setComments(comments: string) {
        this.comments = comments;
    }

    setAttempts(attempts: number) {
        this.attempts = attempts;
    }

    setCompleted(completed: number) {
        this.completed = completed;
    }

}

export class SessionRouteDataDictionary {
    [routeId: string]: SessionRouteData
}

// Requests
export class BaseRequest {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
}

export class AddSessionRequest {
    token: string;
    routes: SessionRouteDataDictionary;
}

export class UserInfoRequest {
    token: string;
    name: string;
    pictureUrl: string;

    constructor(token, name, pictureUrl) {
        this.token = token;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }
}
