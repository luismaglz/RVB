"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var GoogleAuth = require('google-auth-library');
var uri = "mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin";
var clientId = '663414328102-hajhpv1hv41q1nqqolct865ddsln8g75.apps.googleusercontent.com';
// Connect
var connection = function (closure) {
    return MongoClient.connect(uri, function (err, db) {
        if (err) {
            return console.log(err);
        }
        closure(db);
    });
};
// Error handling
var sendError = function (err, res) {
    response.status = 501;
    response.message = typeof err === 'object' ? err.message : err;
    res.status(501).json(response);
};
// Response handling
var response = {
    status: 200,
    data: [],
    message: null
};
// Get routes for gym
router.get('/routes', function (req, res) {
    var gymId = req.headers.gymid;
    connection(function (db) {
        db.collection('routes')
            .find({ gym: gymId })
            .toArray()
            .then(function (routes) {
            response.data = routes;
            res.json(response);
            db.close();
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
});
// Gyms
router.get('/gyms', function (req, res) {
    connection(function (db) {
        db.collection('gyms')
            .find()
            .toArray()
            .then(function (gyms) {
            response.data = gyms;
            res.json(response);
            db.close();
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
});
router.get('/gyms', function (req, res) {
    var gymId = req.headers.gymid;
    connection(function (db) {
        db.collection('gyms')
            .find({ _id: gymId })
            .toArray()
            .then(function (gym) {
            response.data = gym;
            res.json(response);
            db.close();
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
});
// Sessions
router.post('/session', function (req, res) {
    var addSesssionRequest = req.body;
    verifyToken(res, addSesssionRequest.token, addSession, addSesssionRequest.routes);
});
router.get('/session', function (req, res) {
    verifyToken(res, req.headers.usertoken, getSessions, null);
});
// Users
router.post('/user', function (req, res) {
    var userInfoRequest = req.body;
    verifyToken(res, userInfoRequest.token, findOrAddUser, userInfoRequest);
});
router.post('/routes', function (req, res) {
    connection(function (db) {
        db.collection('gym_1').insertMany([])
            .then(function (result) {
            db.close();
            return result;
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
});
// Helper methods
function getRouteTypeName(routeType) {
    var routeTypes = ['boulder', 'lead', 'top rope', 'speed'];
    return routeTypes[routeType];
}
function verifyToken(res, token, callback, data) {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientId, '', '');
    var userId = null;
    client.verifyIdToken(token, clientId, function (e, login) {
        if (e) {
            sendError(e, res);
        }
        var payload = login.getPayload();
        var userid = payload['sub'];
        callback(userid, data, res);
    });
    return userId;
}
function findOrAddUser(userId, userInfoRequest, res) {
    connection(function (db) {
        db.collection('users').findOne({ _id: userId })
            .then(function (user) {
            db.close();
            if (user) {
                if (user.name === userInfoRequest.name && user.pictureUrl === userInfoRequest.pictureUrl) {
                    response.data = [];
                    res.json(response);
                }
                else {
                    updateUser(userId, userInfoRequest.name, userInfoRequest.pictureUrl, res);
                }
            }
            else {
                updateUser(userId, userInfoRequest.name, userInfoRequest.pictureUrl, res);
            }
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
function addUser(userId, name, pictureUrl, res) {
    connection(function (db) {
        db.collection('users')
            .insertOne({
            _id: userId,
            name: name,
            pictureUrl: pictureUrl
        })
            .then(function (result) {
            db.close();
            response.data = [];
            res.json(response);
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
function updateUser(userId, name, pictureUrl, res) {
    connection(function (db) {
        db.collection('users')
            .updateOne({ _id: userId }, { $set: { _id: userId, name: name, pictureUrl: pictureUrl } }, { upsert: true })
            .then(function (result) {
            db.close();
            res.json(response);
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
function addSession(userId, routes, res) {
    var date = Date.now();
    var totals = {
        lead: 0,
        boulder: 0,
        topRope: 0,
        speed: 0
    };
    for (var routeId in routes) {
        if (routes.hasOwnProperty(routeId)) {
            var route = routes[routeId];
            switch (route.type) {
                case 0:
                    totals.boulder++;
                    break;
                case 1:
                    totals.lead++;
                    break;
                case 2:
                    totals.topRope++;
                    break;
                case 3:
                    totals.speed++;
                    break;
                default:
                    break;
            }
        }
    }
    connection(function (db) {
        db.collection('sessions')
            .insertOne({
            userId: userId,
            date: date,
            session: routes,
            totals: totals
        })
            .then(function (result) {
            db.close();
            response.data = result;
            res.json(response);
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
function getSessions(userId, data, res) {
    connection(function (db) {
        db.collection('sessions')
            .find()
            .sort({ date: -1 })
            .limit(10)
            .toArray()
            .then(function (sessions) {
            db.close();
            populateSessions(sessions, res);
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
function populateSessions(sessions, res) {
    var users = Array.from(new Set(sessions.map(function (session) { return session.userId; })));
    connection(function (db) {
        db.collection('users')
            .find({
            _id: { $in: users }
        })
            .limit(10)
            .toArray()
            .then(function (userRecords) {
            var populatedSessions = sessions.map(function (session) {
                var user = userRecords.find(function (u) { return u._id === session.userId; });
                return {
                    _id: session._id,
                    name: (user && user.name ? user.name : 'climber'),
                    imageUrl: (user && user.pictureUrl ? user.pictureUrl : ''),
                    date: session.date,
                    description: session.comments,
                    climbed: session.totals
                };
            });
            db.close();
            response.data = populatedSessions;
            res.json(response);
        })
            .catch(function (err) {
            db.close();
            sendError(err, res);
        });
    });
}
module.exports = router;
//# sourceMappingURL=api.js.map