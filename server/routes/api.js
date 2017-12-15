"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var GoogleAuth = require('google-auth-library');
var uri = "mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin";
var clientId = '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com';
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
    connection(function (db) {
        db.collection('gym_1').find({})
            .toArray()
            .then(function (routes) {
            response.data = routes;
            res.json(response);
        })
            .catch(function (err) {
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
            return result;
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
});
// Helper methods
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
            response.data = [];
            res.json(response);
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
}
function updateUser(userId, name, pictureUrl, res) {
    connection(function (db) {
        db.collection('users')
            .updateOne({ _id: userId }, { $set: { _id: userId, name: name, pictureUrl: pictureUrl } }, { upsert: true })
            .then(function (result) {
            res.json(response);
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
}
function addSession(userId, routes, res) {
    var date = Date.now();
    connection(function (db) {
        db.collection('sessions')
            .insertOne({
            userId: userId,
            date: date,
            session: routes
        })
            .then(function (result) {
            response.data = result;
            res.json(response);
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
}
function getSessions(userId, data, res) {
    connection(function (db) {
        db.collection('sessions')
            .find()
            .limit(10)
            .toArray()
            .then(function (sessions) {
            populateSessions(sessions, res);
        })
            .catch(function (err) {
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
            response.data = populatedSessions;
            res.json(response);
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
}
module.exports = router;
//# sourceMappingURL=api.js.map