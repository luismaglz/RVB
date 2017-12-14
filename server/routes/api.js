"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var GoogleAuth = require('google-auth-library');
var uri = 'mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin';
var clientId = '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com';
// Connect
var connection = function (closure) {
    return MongoClient.connect(uri, function (err, db) {
        if (err) {
            return console.log(err);
        }
        ;
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
// Get users
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
router.post('/session', function (req, res) {
    var addSesssionRequest = req.body;
    verifyToken(res, addSesssionRequest.token, addSession, addSesssionRequest.routes);
});
router.get('/session', function (req, res) {
    connection(function (db) {
        db.collection('sessions').find({})
            .toArray()
            .then(function (sessions) {
            response.data = sessions;
            res.json(response);
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
});
router.post('/routes', function (req, res) {
    connection(function (db) {
        db.collection('gym_1').insertMany([{
                "zone": "Zone 1",
                "color": "FFEE00",
                "type": "boulder",
                "grade": "v1",
                "setter": "Audra O'Hara Jr.",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 1",
                "color": "FF0000",
                "type": "boulder",
                "grade": "v3",
                "setter": "Candice Wyman",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "0D7FFF",
                "type": "boulder",
                "grade": "v5",
                "setter": "Audra O'Hara Jr.",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "E8840C",
                "type": "boulder",
                "grade": "v2",
                "setter": "Audra O'Hara Jr.",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "FFEE00",
                "type": "Lead",
                "grade": "5.10a",
                "setter": "Candice Wyman",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "FF0000",
                "type": "Lead",
                "grade": "5.11",
                "setter": "Audra O'Hara Jr.",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "0D7FFF",
                "type": "Lead",
                "grade": "5.10b",
                "setter": "Candice Wyman",
                "likes": 0,
                "dislikes": 0
            },
            {
                "zone": "Zone 2",
                "color": "E8840C",
                "type": "Lead",
                "grade": "5.10c",
                "setter": "Audra O'Hara Jr.",
                "likes": 0,
                "dislikes": 0
            }])
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            sendError(err, res);
        });
    });
});
router.post('/google-token/validate', function (req, res) {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientId, '', '');
    client.verifyIdToken(req.body.token, clientId, function (e, login) {
        if (e) {
            sendError(e, res);
        }
        var payload = login.getPayload();
        var userid = payload['sub'];
    });
});
router.post('/sessions/complete', function (req, res) {
    connection(function (db) {
        db.collection('sessions').inssert().then(function (result) {
            return result;
        }).catch(function (err) {
            sendError(err, res);
        });
    });
});
module.exports = router;
//# sourceMappingURL=api.js.map