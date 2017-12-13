const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const GoogleAuth = require('google-auth-library');

// const uri = 'mongodb://luismaglz:tocopan88@cluster0-shard-00-00-uxxuf.mongodb.net:27017,cluster0-shard-00-01-uxxuf.mongodb.net:27017,cluster0-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const uri = 'mongodb://luismaglz:tocopan88@route-test-cluster-shard-00-00-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-01-uxxuf.mongodb.net:27017,route-test-cluster-shard-00-02-uxxuf.mongodb.net:27017/test?ssl=true&replicaSet=Route-Test-Cluster-shard-0&authSource=admin';
const clientId = '832252046561-m4te28o0t69e40r0nl1tuddu59h6q7er.apps.googleusercontent.com';
// Connect
const connection = (closure) => {
    return MongoClient.connect(uri, (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });
};


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/routes', (req, res) => {
    connection((db) => {
        db.collection('gym_1').find({})
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

function getIdFromToken(token) {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientId, '', '');
    var userId = null;
    client.verifyIdToken(
        req.body.token,
        clientId,
        function (e, login) {
            if (e) {
                sendError(e, res);
            }
            var payload = login.getPayload();
            userId = payload['sub'];
        });
    return userId;
}

router.post('/sessions', (req, res) => {
    const sessionData = req.data;
    let userId = getIdFromToken(request.body.token);

    connection((db) => {
        db.collection('sessions')
            .insertOne([{
                userId:userId,
                date:Date.now(),
                session:request.body.routes
            }])
            .then(function (result) { return result; })
            .catch((err) => { sendError(err, res); });
    });
});

router.post('/routes', (req, res) => {
    connection((db) => {
        db.collection('gym_1').insertMany(
            [{
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
            .catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/google-token/validate', (req, res) => {
    var auth = new GoogleAuth;
    var client = new auth.OAuth2(clientId, '', '');
    client.verifyIdToken(
        req.body.token,
        clientId,
        function (e, login) {
            if (e) {
                sendError(e, res);
            }
            var payload = login.getPayload();
            var userid = payload['sub'];
        })
});

router.post('/sessions/complete', (req, res) => {
    connection((db) => {
        db.collection('sessions').inssert(

        ).then(function (result) {
            return result;
        }).catch((err) => {
            sendError(err, res);
        });
    });

})
module.exports = router;