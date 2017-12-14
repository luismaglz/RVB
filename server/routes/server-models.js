"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Classes
var SessionRouteData = /** @class */ (function () {
    function SessionRouteData(routeId) {
        this.routeId = routeId;
        this.attempts = 0;
        this.completed = 0;
        this.comments = null;
    }
    SessionRouteData.prototype.addAttempt = function () {
        this.attempts++;
    };
    SessionRouteData.prototype.removeAttempt = function () {
        if (this.attempts > 0) {
            this.attempts--;
        }
    };
    SessionRouteData.prototype.addCompleted = function () {
        this.completed++;
    };
    SessionRouteData.prototype.removeCompleted = function () {
        if (this.completed > 0) {
            this.completed--;
        }
    };
    SessionRouteData.prototype.setComments = function (comments) {
        this.comments = comments;
    };
    SessionRouteData.prototype.setAttempts = function (attempts) {
        this.attempts = attempts;
    };
    SessionRouteData.prototype.setCompleted = function (completed) {
        this.completed = completed;
    };
    return SessionRouteData;
}());
exports.SessionRouteData = SessionRouteData;
var SessionRouteDataDictionary = /** @class */ (function () {
    function SessionRouteDataDictionary() {
    }
    return SessionRouteDataDictionary;
}());
exports.SessionRouteDataDictionary = SessionRouteDataDictionary;
// Requests
var AddSessionRequest = /** @class */ (function () {
    function AddSessionRequest() {
    }
    return AddSessionRequest;
}());
exports.AddSessionRequest = AddSessionRequest;
//# sourceMappingURL=server-models.js.map