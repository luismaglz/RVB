const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const GoogleAuth = require('google-auth-library');

import { AddSessionRequest, UserInfoRequest, ISessionRecord, IUserRecord, ISessionInfo, SessionRouteDataDictionary } from './server-models';

const uri = "mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin";
const clientId = '832252046561-0ffsre3lhksflugj7r1s2teaojt6950j.apps.googleusercontent.com';

// Connect
const connection = (closure) => {
    return MongoClient.connect(uri, (err, db) => {
        if (err) {
            return console.log(err)
        }
        closure(db);
    });
    
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err === 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
const response = {
    status: 200,
    data: [],
    message: null
};

// Get routes for gym
router.get('/routes', (req, res) => {
    connection((db) => {
        db.collection('routes').find({})
            .toArray()
            .then((routes) => {
                response.data = routes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Sessions
router.post('/session', (req, res) => {
    const addSesssionRequest: AddSessionRequest = req.body;
    verifyToken(res, addSesssionRequest.token, addSession, addSesssionRequest.routes);
});

router.get('/session', (req, res) => {
    verifyToken(res, req.headers.usertoken, getSessions, null);
});

// Users
router.post('/user', (req, res) => {
    const userInfoRequest: UserInfoRequest = req.body;
    verifyToken(res, userInfoRequest.token, findOrAddUser, userInfoRequest);
});


router.post('/routes', (req, res) => {
    connection((db) => {
        db.collection('gym_1').insertMany([])
            .then(function (result) {
                return result;
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});


// Helper methods

function verifyToken(res, token: string, callback: Function, data) {
    const auth = new GoogleAuth;
    const client = new auth.OAuth2(clientId, '', '');
    const userId = null;
    client.verifyIdToken(
        token,
        clientId,
        function (e, login) {
            if (e) {
                sendError(e, res);
            }
            const payload = login.getPayload();
            const userid = payload['sub'];
            callback(userid, data, res);
        }

    );
    return userId;
}

function findOrAddUser(userId: string, userInfoRequest: UserInfoRequest, res) {
    connection((db) => {
        db.collection('users').findOne({ _id: userId })
            .then((user) => {
                if (user) {
                    if (user.name === userInfoRequest.name && user.pictureUrl === userInfoRequest.pictureUrl) {
                        response.data = [];
                        res.json(response);
                    } else {
                        updateUser(userId, userInfoRequest.name, userInfoRequest.pictureUrl, res);
                    }
                } else {
                    updateUser(userId, userInfoRequest.name, userInfoRequest.pictureUrl, res);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}

function addUser(userId: string, name: string, pictureUrl: string, res) {
    connection((db) => {
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
            .catch((err) => {
                sendError(err, res);
            });
    });
}

function updateUser(userId: string, name: string, pictureUrl: string, res) {
    connection((db) => {
        db.collection('users')
            .updateOne(
            { _id: userId },
            { $set: { _id: userId, name: name, pictureUrl: pictureUrl } },
            { upsert: true }
            )
            .then(function (result) {
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}

function addSession(userId, routes: SessionRouteDataDictionary, res) {
    const date = Date.now();
    const totals = {
        lead: 0,
        boulder: 0,
        topRope: 0,
        speed: 0
    };

    for (const routeId in routes) {
        if (routes.hasOwnProperty(routeId)) {
            const route = routes[routeId];

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
                case 3: totals.speed++;
                    break;
                default:
                    break;

            }
        }
    }

    connection((db) => {
        db.collection('sessions')
            .insertOne({
                userId: userId,
                date: date,
                session: routes,
                totals: totals
            })
            .then(function (result) {
                response.data = result;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}

function getSessions(userId, data, res) {
    connection((db) => {
        db.collection('sessions')
            .find()
            .limit(10)
            .toArray()
            .then((sessions) => {
                populateSessions(sessions, res);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}

function populateSessions(sessions: Array<ISessionRecord>, res) {
    const users = Array.from(new Set(sessions.map(session => session.userId)));
    connection((db) => {
        db.collection('users')
            .find({
                _id: { $in: users }
            })
            .limit(10)
            .toArray()
            .then((userRecords: Array<IUserRecord>) => {
                const populatedSessions = sessions.map(session => {
                    const user = userRecords.find(u => u._id === session.userId);
                    return {
                        _id: session._id,
                        name: (user && user.name ? user.name : 'climber'),
                        imageUrl: (user && user.pictureUrl ? user.pictureUrl : ''),
                        date: session.date,
                        description: session.comments,
                        climbed: session.totals
                    } as ISessionInfo;
                });
                response.data = populatedSessions;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
}

module.exports = router;
